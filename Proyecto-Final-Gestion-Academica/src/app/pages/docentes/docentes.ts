// ====================================================
// ARCHIVO: docentes.ts
// DESCRIPCIÓN: Componente TypeScript del Tablero de Docentes
// FUNCIONALIDAD: 
//   - Provee datos de la lista de docentes
//   - Maneja la estructura de información docente
//   - Controla los datos para la tabla de visualización
//   - Define los campos y valores para cada docente
// NOTAS:
//   - Datos mock/estáticos para demostración
//   - Estructura de datos: id, nombre, área, grado, SNI, status
//   - SNI: Niveles I, II, III, Candidato, o 'N/A'
//   - Status: Activo/Inactivo (con colores condicionales en template)
//   - Grados académicos: Doctorado, Maestría
//   - Áreas de especialización: Matemáticas, Física, Química, etc.
//   - TODO: Conectar con servicio real para datos dinámicos
//   - TODO: Implementar funcionalidades 
//   - Iconos representativos mediante emojis genéricos <----- **CAMBIAR POR ICONOS DE MEJOR ESTILO (TODOS LOS ARCHIVOS)**
// ====================================================

import { Component } from '@angular/core';
import { SqlService } from '../../srv/docentes.service';

@Component({
  selector: 'app-docentes',
  standalone: false,
  templateUrl: './docentes.html',
  styleUrls: ['./docentes.css']
})
export class Docentes {
  docentes: any = [];          // copia ORIGINAL que viene del backend
  docentesFiltrados: any = []; // lo que se muestra en la tabla

  terminoBusqueda: string = '';  // texto del input de búsqueda

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
  /**
   *   docentes = [
    { id: 1, nombre: 'Dr. Juan Pérez', area: 'Matemáticas', grado: 'Doctorado', sni: 'Nivel I', status: 'Activo' },
    { id: 2, nombre: 'Dra. María García', area: 'Física', grado: 'Doctorado', sni: 'Nivel II', status: 'Activo' },
    { id: 3, nombre: 'Mtro. Carlos López', area: 'Química', grado: 'Maestría', sni: 'N/A', status: 'Activo' },
    { id: 4, nombre: 'Dr. Ana Martínez', area: 'Biología', grado: 'Doctorado', sni: 'Candidato', status: 'Activo' },
    { id: 5, nombre: 'Dra. Rosa Torres', area: 'Ingeniería', grado: 'Doctorado', sni: 'Nivel III', status: 'Inactivo' },
  ];
   */

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
    // refrescar la tabla
    this.cargarDocentes();


  }
  async cargarDocentes() {
    this.docentes = await this.sql.conectarAPI(); //await detiene la ejecución de ngOnInit hasta que la promesa se resuelve y asigna el resultado a this.docentes.
    this.docentesFiltrados = [...this.docentes]; //copia de docentes para que al inicio la tabla muestre todo
  }

  searchFilter() {
    // Pasamos lo que escribió el usuario a minúsculas y sin espacios extra
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
