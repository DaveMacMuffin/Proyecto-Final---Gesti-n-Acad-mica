// ====================================================
// ARCHIVO: dashboard.ts
// DESCRIPCIÓN: Componente TypeScript del Dashboard principal
// FUNCIONALIDAD: 
//   - Provee datos para las estadísticas del sistema
//   - Maneja la lista de actividades recientes
//   - Controla las tareas pendientes del sistema
//   - Define la estructura de datos para el template
// NOTAS:
//   - Interface Stat para tipado fuerte de estadísticas
//   - Datos mock/estáticos para demostración
//   - Stats con tendencias positivas/negativas y colores
//   - Activities con tipos categorizados (warning, success, info)
//   - Tasks con niveles de prioridad (Alta, Media, Baja)
//   - Iconos representativos mediante emojis genéricos <----- **CAMBIAR POR ICONOS DE MEJOR ESTILO (TODOS LOS ARCHIVOS)**
//   - TODO: Conectar con servicios reales para datos dinámicos
// ====================================================

import { Component } from '@angular/core';

interface Stat {
  title: string;
  value: string;
  icon: string;
  trend: string;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  stats: Stat[] = [
    { title: 'Docentes Activos', value: '156', icon: '👥', trend: '+12%', color: 'text-primary' },
    { title: 'Tickets Pendientes', value: '23', icon: '⚠️', trend: '-8%', color: 'text-warning' },
    { title: 'Investigadores SNI', value: '45', icon: '🏆', trend: '+5%', color: 'text-accent' },
    { title: 'Materias Activas', value: '340', icon: '📚', trend: '+3%', color: 'text-info' }
  ];

  activities = [
    { action: 'Nuevo ticket creado', time: 'Hace 5 minutos', type: 'warning' },
    { action: 'Docente agregado', time: 'Hace 1 hora', type: 'success' },
    { action: 'Reporte generado', time: 'Hace 2 horas', type: 'info' }
  ];

  tasks = [
    { task: 'Revisar tickets pendientes', priority: 'Alta' },
    { task: 'Actualizar perfiles docentes', priority: 'Media' },
    { task: 'Generar reporte mensual', priority: 'Baja' }
  ];
}
