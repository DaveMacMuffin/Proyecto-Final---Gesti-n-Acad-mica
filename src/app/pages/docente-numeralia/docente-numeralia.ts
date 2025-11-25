// ====================================================
// ARCHIVO: docente-numeralia.ts
// DESCRIPCIÓN: Componente TypeScript de Numeralia Docente
// FUNCIONALIDAD: 
//   - Provee datos para estadísticas de planta docente
//   - Maneja distribuciones por grado académico
//   - Controla datos de investigadores SNI
//   - Gestiona competencias de idioma del personal
//   - Define estructura para visualización de métricas
// NOTAS:
//   - Datos mock/estáticos para demostración
//   - Stats principales con iconos emoji representativos
//   - Distribuciones con porcentajes calculados
//   - Grado académico: Doctorado, Maestría, Licenciatura
//   - SNI: Niveles I, II, III y Candidatos
//   - Idiomas: Inglés Avanzado, Intermedio y otros
//   - TODO: Conectar con servicios reales para datos dinámicos
//   - TODO: Implementar cálculos automáticos de porcentajes
//   - Iconos representativos mediante emojis genéricos <----- **CAMBIAR POR ICONOS DE MEJOR ESTILO (TODOS LOS ARCHIVOS)**
// ====================================================

import { Component } from '@angular/core';

@Component({
  selector: 'app-docente-numeralia',
  standalone: false,
  templateUrl: './docente-numeralia.html',
  styleUrls: ['./docente-numeralia.css']
})
export class DocenteNumeralia {
  stats = [
    { label: 'Total Docentes', value: 156, icon: '👥', color: 'text-primary' },
    { label: 'Activos', value: 142, icon: '✅', color: 'text-success' },
    { label: 'Inactivos', value: 14, icon: '❌', color: 'text-muted-foreground' },
    { label: 'SNI Activos', value: 45, icon: '🏆', color: 'text-accent' },
  ];

  gradoDistribution = [
    { grado: 'Doctorado', count: 89, percentage: 57 },
    { grado: 'Maestría', count: 52, percentage: 33 },
    { grado: 'Licenciatura', count: 15, percentage: 10 },
  ];

  sniDistribution = [
    { nivel: 'Nivel III', count: 8, percentage: 18 },
    { nivel: 'Nivel II', count: 12, percentage: 27 },
    { nivel: 'Nivel I', count: 15, percentage: 33 },
    { nivel: 'Candidato', count: 10, percentage: 22 },
  ];

  idiomaDistribution = [
    { idioma: 'Inglés Avanzado', count: 78, percentage: 50 },
    { idioma: 'Inglés Intermedio', count: 52, percentage: 33 },
    { idioma: 'Otros idiomas', count: 26, percentage: 17 },
  ];
}
