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

@Component({
  selector: 'app-docentes',
  standalone: false,
  templateUrl: './docentes.html',
  styleUrls: ['./docentes.css']
})
export class Docentes {
  docentes = [
    { id: 1, nombre: 'Dr. Juan Pérez', area: 'Matemáticas', grado: 'Doctorado', sni: 'Nivel I', status: 'Activo' },
    { id: 2, nombre: 'Dra. María García', area: 'Física', grado: 'Doctorado', sni: 'Nivel II', status: 'Activo' },
    { id: 3, nombre: 'Mtro. Carlos López', area: 'Química', grado: 'Maestría', sni: 'N/A', status: 'Activo' },
    { id: 4, nombre: 'Dr. Ana Martínez', area: 'Biología', grado: 'Doctorado', sni: 'Candidato', status: 'Activo' },
    { id: 5, nombre: 'Dra. Rosa Torres', area: 'Ingeniería', grado: 'Doctorado', sni: 'Nivel III', status: 'Inactivo' },
  ];
}
