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

@Component({
  selector: 'app-tickets',
  standalone: false,
  templateUrl: './tickets.html',
  styleUrls: ['./tickets.css']
})
export class Tickets {
  tickets = [
    {
      id: 'T-001',
      tipo: 'Cambio de Calificación',
      profesor: 'Dr. Juan Pérez',
      fecha: '2024-01-15',
      prioridad: 'Alta',
      status: 'Pendiente',
    },
    {
      id: 'T-002',
      tipo: 'Cambio Fecha Examen',
      profesor: 'Dra. María García',
      fecha: '2024-01-14',
      prioridad: 'Media',
      status: 'En Proceso',
    },
    {
      id: 'T-003',
      tipo: 'Integridad Académica',
      profesor: 'Mtro. Carlos López',
      fecha: '2024-01-13',
      prioridad: 'Alta',
      status: 'Resuelto',
    },
    {
      id: 'T-004',
      tipo: 'Incidencia de Pago',
      profesor: 'Dr. Ana Martínez',
      fecha: '2024-01-12',
      prioridad: 'Media',
      status: 'Pendiente',
    },
    {
      id: 'T-005',
      tipo: 'Reporte Disciplinar',
      profesor: 'Dra. Rosa Torres',
      fecha: '2024-01-10',
      prioridad: 'Baja',
      status: 'Resuelto',
    },
  ];
}
