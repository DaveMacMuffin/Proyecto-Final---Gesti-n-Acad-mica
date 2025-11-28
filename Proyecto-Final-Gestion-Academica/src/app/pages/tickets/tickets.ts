import { Component } from '@angular/core';
import { SqlService } from '../../srv/docentes.service';

@Component({
  selector: 'app-tickets',
  standalone: false,
  templateUrl: './tickets.html',
  styleUrls: ['./tickets.css']
})
export class Tickets {
  tickets: any = [];
  ticketsFiltrados: any = [];
  listaDocentes: any = [];
  terminoBusqueda: string = '';
  categoriaSeleccionada = 'Todas las categorías';
  ordenSeleccionado = 'Reciente';

  tot_pendientes = 0;
  tot_proceso = 0;
  tot_resueltos = 0;

  nuevoTicket = {
    id_ticket: '',
    tipo: '',
    descripcion: '',
    prioridad: '',
    estado: '',
    id_docente: '',
    fecha_creacion: '',
    fecha_cierre: '',
  };

  constructor(private sql: SqlService) { }   

  async ngOnInit() {
    this.listaDocentes = await this.sql.conectarAPI();
    await this.cargarTickets();
    await this.cargarCintaTickets();

  }
  async guardarTicket() {
    await this.sql.agregarTicket(this.nuevoTicket);

    const btnClose = document.querySelector('#modalAgregarTicket [data-dismiss="modal"]') as HTMLElement;
    if (btnClose) btnClose.click();

    this.nuevoTicket = {
      id_ticket: '',
      tipo: '',
      descripcion: '',
      prioridad: '',
      estado: '',
      id_docente: '',
      fecha_creacion: '',
      fecha_cierre: '',
    };
    this.ticketsFiltrados = [...this.tickets];
    await this.cargarTickets();
    await this.cargarCintaTickets();


  }
  async cargarTickets() {
    this.tickets = await this.sql.conectarAPI2();  
    console.log("Devuelve api2:", this.tickets)
    this.ticketsFiltrados = [...this.tickets];  
  }

  searchFilterTicket() {
     
    const term = this.terminoBusqueda.toLowerCase().trim();

     
    if (!term) {
      this.ticketsFiltrados = [...this.tickets];
      return;
    }

     
    this.ticketsFiltrados = this.tickets.filter((t: any) => {
       
      const id = (t.id + '').toLowerCase();
      const tipo = (t.tipo + '').toLowerCase();
      const profesor = (t.profesor || '').toLowerCase();
      const prioridad = (t.prioridad || '').toLowerCase();
      const estado = (t.status || '').toLowerCase();

      return (
        id.includes(term) ||
        tipo.includes(term) ||
        profesor.includes(term) ||
        prioridad.includes(term) ||
        estado.includes(term)
      );
    });
  }
  aplicarFiltrosTipo() {
    this.ticketsFiltrados = [...this.tickets];

    let resultado = this.tickets;

    
    if (this.categoriaSeleccionada !== 'Todas las categorías') {
      resultado = resultado.filter((t: any) =>
        t.tipo === this.categoriaSeleccionada
      );
    }

    this.ticketsFiltrados = resultado;

  }
  aplicarFiltrosFecha() {
    let resultado = [...this.ticketsFiltrados];

     
    if (this.ordenSeleccionado === 'Reciente')  
    {
      resultado.sort((a: any, b: any) => {
        if (a.fecha < b.fecha) {
          return 1;
        }
        else {
          return -1;
        }
      });
    }
    else if (this.ordenSeleccionado === 'Antiguo') 
    {
      resultado.sort((a: any, b: any) => {
        if (a.fecha > b.fecha) {
          return 1;
        } else {
          return -1;
        }
      });
    }
    else if (this.ordenSeleccionado === 'Prioridad') {
      const peso: any = { Alta: 3, Media: 2, Baja: 1 };
      resultado.sort((a: any, b: any) =>
        (peso[b.prioridad] || 0) - (peso[a.prioridad] || 0)
      );
    }

    this.ticketsFiltrados = resultado;
  }
  async cargarCintaTickets() {

    const num_tickets: any = await this.sql.getCintaTickets();
    console.log("Cantidades:", num_tickets);

    this.tot_pendientes = num_tickets.pendientes || 0;
    this.tot_proceso = num_tickets.en_proceso || 0;
    this.tot_resueltos = num_tickets.resueltos_mes || 0;
  }

  ticketEditar = {
    id_ticket: 0,
    status: ''
  };

  ticketEliminar = {
    id_ticket: '',
    tipo: '',
    descripcion: '',
    prioridad: '',
    status: '',
    id_docente: '',
    fecha_creacion: '',
    fecha_cierre: '',
  };

  abrirModalEditar(ticket: any) {
    this.ticketEditar = {
      id_ticket: ticket.id,
      status: ticket.status
    };
    console.log("Lo que tiene el modal", this.ticketEditar);
  }


  async actualizarEstadoTicket() {
    await this.sql.editarTicketEstado(this.ticketEditar);

    const btnClose =
      document.querySelector('#modalEditarTicket [data-dismiss="modal"]') as HTMLElement;
    if (btnClose) btnClose.click();

    await this.cargarTickets();
    await this.cargarCintaTickets();
    this.ticketsFiltrados = [...this.tickets];

    alert("Estado actualizado correctamente");
  }

  async eliminarRegistro(index: number, ticket: any) {
    if (!confirm("¿Estás seguro de eliminar el ticket de " + ticket.tipo + "?")) {
      return;  
    }
    if (ticket.status == "Resuelto") {
      await this.sql.eliminarTicketBD(ticket.id);
      this.tickets.splice(index, 1);
      this.ticketsFiltrados.splice(index, 1);

      await this.cargarTickets();
      await this.cargarCintaTickets();
    }
    else {
      alert("Este ticket no ha sido resuelto, no lo puede eliminar");
    }



  }

}
