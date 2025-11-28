import { Component } from '@angular/core';
import { SqlService } from '../../srv/docentes.service';

@Component({
  selector: 'app-docentes',
  standalone: false,
  templateUrl: './docentes.html',
  styleUrls: ['./docentes.css']
})
export class Docentes {
  docentes: any = [];         
  docentesFiltrados: any = [];  

  terminoBusqueda: string = '';  

  nuevoDocente = {
    id: '',
    nombre: '',
    correo: '',
    academia: '',
    grado: '',
    idioma: '',
    sni: '',
    status: ''
  };


  constructor(private sql: SqlService) { }
  async ngOnInit() {
    this.docentes = await this.sql.conectarAPI();
    this.docentesFiltrados = await this.sql.conectarAPI();

    console.log(this.docentes)
  }

  async guardarDocente() {
    await this.sql.agregarDocente(this.nuevoDocente);

const btnClose = document.querySelector('#modalAgregarDocente [data-dismiss="modal"]') as HTMLElement;
    if (btnClose) btnClose.click();

    this.nuevoDocente = {
      id: '',
      nombre: '',
      correo: '',
      academia: '',
      grado: '',
      idioma: '',
      sni: '',
      status: ''
    }
     this.cargarDocentes();


  }
  async cargarDocentes() {
    this.docentes = await this.sql.conectarAPI(); //await detiene la ejecución de ngOnInit hasta que la promesa se resuelve y asigna el resultado a this.docentes
    this.docentesFiltrados = [...this.docentes]; //copia de docentes para que al inicio la tabla muestre todo
  }

  searchFilter() {
     const term = this.terminoBusqueda.toLowerCase().trim();

    // Si no hay nada escrito entonces mostrar todos
    if (!term) {
      this.docentesFiltrados = [...this.docentes];
      return;
    }

    // Si hay texto, filtramos
    this.docentesFiltrados = this.docentes.filter((d: any) => {
      // Sacamos cada campo y lo pasamos a string minúscula
      const id = (d.id_docente + '').toLowerCase();  // Con + '' lo obligas a ser cadena
      const nombre = (d.nombre || '').toLowerCase();
      const academia = (d.academia || '').toLowerCase();
      const grado = (d.grado || '').toLowerCase();
      const idioma = (d.idioma || '').toLowerCase();
      const sni = (d.sni || '').toLowerCase();
      const status = (d.status || '').toLowerCase();

      //Si uno solo contiene el término entonces el docente es válido y se queda.
      return (
        id.includes(term) ||
        nombre.includes(term) ||
        academia.includes(term) ||
        grado.includes(term) ||
        idioma.includes(term) ||

        (sni == term) ||
        (status == term)

      );
    });
  }
  docenteEditar = {
    id: '',
    nombre: '',
    correo: '',
    academia: '',
    grado: '',
    idioma: '',
    sni: '',
    status: ''
  };
  docenteEliminar = {
    id: '',
    nombre: '',
    correo: '',
    academia: '',
    grado: '',
    idioma: '',
    sni: '',
    status: ''
  };

  abrirModalEditar(docente: any) {
    this.docenteEditar = { ...docente };
  };

  async actualizarDocente() {
    await this.sql.editarDocente(this.docenteEditar);

const btnClose = document.querySelector('#modalEditarDocente [data-dismiss="modal"]') as HTMLElement;    
if (btnClose) btnClose.click();

    this.docenteEditar= {
      id: '',
      nombre: '',
      correo: '',
      academia: '',
      grado: '',
      idioma: '',
      sni: '',
      status: ''
    }
    // refrescar la tabla
    this.cargarDocentes();


  }
  async eliminarRegistro(index:number, docente:any){
    if (!confirm("¿Estás seguro de eliminar a " + docente.nombre + "?")) {
    return; // Si dice cancelar, no hacemos nada
  }
  await this.sql.eliminarDocenteBD(docente.id_docente);
  this.docentes.splice(index, 1);
  
  this.cargarDocentes();

  }
exportarCSV() {

  if (!this.docentes || this.docentes.length === 0) {
    alert("No hay datos para exportar.");
    return;
  }

  let csvContent = "data:text/csv;charset=utf-8,";

  // Para evitar errores con acentos en Excel
  csvContent += "\uFEFF";

  csvContent += "LISTADO DE DOCENTES\n";
  csvContent += "ID,Nombre,Academia,Grado,Idioma,SNI,Status\n";

  this.docentes.forEach((d: any, index: number) => {
    csvContent += `${index + 1},"${d.nombre}","${d.academia}","${d.grado}","${d.idioma}","${d.sni}","${d.status}"\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "lista_docentes.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

}
