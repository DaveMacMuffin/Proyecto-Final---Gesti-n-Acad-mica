// ====================================================
// ARCHIVO: reportes-academico.ts
// DESCRIPCIÓN: Componente TypeScript del Dashboard Académico
// FUNCIONALIDAD: 
//   - Provee datos para reportes de rendimiento académico
//   - Maneja información de investigadores SNI
//   - Controla métricas de evaluación docente
//   - Gestiona datos para visualización de desempeño por materia
// NOTAS:
//   - Datos mock/estáticos para demostración
//   - Reportes por materia con promedios y tasas de aprobación
//   - Lista de investigadores SNI con nivel y publicaciones
//   - Evaluación docente por criterios específicos
//   - Criterios de evaluación: dominio, claridad, puntualidad, retroalimentación
//   - Niveles SNI: Nivel I, Nivel II, Candidato
//   - Materias representativas del área científica
//   - TODO: Conectar con servicios reales para datos dinámicos
//   - TODO: Implementar filtrado por periodo/departamento
//   - TODO: Agregar cálculos automáticos de métricas
//   - TODO: Implementar exportación real de datos
//   - TODO: Agregar más criterios de evaluación docente (opcional)
// ====================================================

import { Component } from '@angular/core';

@Component({
  selector: 'app-reportes-academico',
  standalone: false,
  templateUrl: './reportes-academico.html',
  styleUrls: ['./reportes-academico.css']
})
export class ReportesAcademico {
  reportesPorMateria = [
    { materia: 'Cálculo Diferencial', promedio: 8.5, aprobados: 85, reprobados: 15 },
    { materia: 'Álgebra Lineal', promedio: 8.8, aprobados: 90, reprobados: 10 },
    { materia: 'Física I', promedio: 7.9, aprobados: 78, reprobados: 22 },
    { materia: 'Química General', promedio: 8.2, aprobados: 82, reprobados: 18 },
  ];

  docentesSNI = [
    { nombre: 'Dr. Juan Pérez', nivel: 'Nivel I', publicaciones: 12 },
    { nombre: 'Dra. María García', nivel: 'Nivel II', publicaciones: 24 },
    { nombre: 'Dr. Ana Martínez', nivel: 'Candidato', publicaciones: 6 },
  ];

  evaluacionDocente = [
    { criterio: 'Dominio de la materia', calificacion: 9.1 },
    { criterio: 'Claridad en explicaciones', calificacion: 8.7 },
    { criterio: 'Puntualidad y asistencia', calificacion: 9.3 },
    { criterio: 'Retroalimentación', calificacion: 8.5 },
  ];
}
