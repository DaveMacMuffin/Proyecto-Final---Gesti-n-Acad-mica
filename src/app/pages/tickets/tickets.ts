// ====================================================
// ARCHIVO: tickets.ts
// DESCRIPCIÓN: Componente TypeScript del sistema de tickets
// FUNCIONALIDAD: 
//   - Provee datos de tickets e incidencias del sistema
//   - Maneja la estructura de información de tickets
//   - Controla los estados y prioridades de los tickets
//   - Gestiona la lista completa de solicitudes y reportes
// NOTAS:
//   - Datos mock/estáticos para demostración
//   - Tickets con ID único, tipo, profesor, fecha, prioridad y status
//   - Tipos de tickets: Cambio calificación, fecha examen, integridad, etc.
//   - Prioridades: Alta, Media, Baja (con colores condicionales)
//   - Estados: Pendiente, En Proceso, Resuelto
//   - Fechas en formato YYYY-MM-DD para ordenamiento
//   - Profesores con títulos académicos (Dr., Dra., Mtro.)
//   - TODO: Conectar con servicio real de gestión de tickets
//   - TODO: Implementar CRUD completo para tickets 
//   - TODO: Agregar filtrado y búsqueda en tiempo real
//   - TODO: Implementar sistema de notificaciones para cambios
//   - TODO: Implementar asignación de tickets a usuarios
// ====================================================

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

  constructor(private sql: SqlService) { }   // MISMO servicio que en docentes.ts

  async ngOnInit() {
    this.listaDocentes = await this.sql.conectarAPI();
    await this.cargarTickets();
    await this.cargarCintaTickets();

  }
  async guardarTicket() {
    await this.sql.agregarTicket(this.nuevoTicket);

    const btnClose = document.querySelector('[data-dismiss="modal"]') as HTMLElement;
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
    // refrescar la tabla
    await this.cargarTickets();


  }
  async cargarTickets() {
    this.tickets = await this.sql.conectarAPI2();  // tu función que hace el $.ajax GET
    this.ticketsFiltrados = [...this.tickets]; //copia de docentes para que al inicio la tabla muestre todo
  }

  searchFilterTicket() {
    // Pasamos lo que escribió el usuario a minúsculas y sin espacios extra
    const term = this.terminoBusqueda.toLowerCase().trim();

    // Si no hay nada escrito → mostrar todos
    if (!term) {
      this.ticketsFiltrados = [...this.tickets];
      return;
    }

    // Si hay texto, filtramos
    this.ticketsFiltrados = this.tickets.filter((t: any) => {
      // Sacamos cada campo y lo pasamos a string minúscula
      const id = (t.id + '').toLowerCase();
      const tipo = (t.tipo + '').toLowerCase();
      const profesor = (t.profesor || '').toLowerCase();
      const prioridad = (t.prioridad || '').toLowerCase();
      const estado = (t.estado || '').toLowerCase();

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
    let resultado = this.tickets;

    // 1) Filtro por categoría
    if (this.categoriaSeleccionada !== 'Todas las categorías') {
      resultado = resultado.filter((t: any) =>
        t.tipo === this.categoriaSeleccionada
      );
    }

    this.ticketsFiltrados = resultado;

  }
  aplicarFiltrosFecha() {
    let resultado = [...this.ticketsFiltrados];

    // 2) Ordenamiento
    if (this.ordenSeleccionado === 'Reciente') {
      resultado.sort((a: any, b: any) => {
        if (a.fecha < b.fecha)  
          {
          return 1;
        } 
        else  
          {
          return -1;
        }
      });
    }
    else if (this.ordenSeleccionado === 'Antiguo') {
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

}

