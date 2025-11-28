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

    const btnClose = document.querySelector('[data-dismiss="modal"]') as HTMLElement;
    if (btnClose) btnClose.click();

    this.nuevoDocente = {
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
    this.docentes = await this.sql.conectarAPI();  // tu función que hace el $.ajax GET
    this.docentesFiltrados = [...this.docentes]; //copia de docentes para que al inicio la tabla muestre todo
  }

  searchFilter() {
    // Pasamos lo que escribió el usuario a minúsculas y sin espacios extra
    const term = this.terminoBusqueda.toLowerCase().trim();

    // Si no hay nada escrito → mostrar todos
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
      const sni = (d.sni || '').toLowerCase();
      const status = (d.status || '').toLowerCase();

      //Si uno solo contiene el término entonces el docente es válido y se queda.
      return (
        id.includes(term) ||
        nombre.includes(term) ||
        academia.includes(term) ||
        grado.includes(term) ||
        (sni == term) ||
        (status == term)

      );
    });
  }
}
