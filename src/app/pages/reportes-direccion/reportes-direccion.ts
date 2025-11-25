// ====================================================
// ARCHIVO: reportes-direccion.ts
// DESCRIPCIÓN: Componente TypeScript del Dashboard de Dirección
// FUNCIONALIDAD: 
//   - Provee datos para KPIs estratégicos institucionales
//   - Maneja indicadores mensuales de desempeño
//   - Controla el resumen ejecutivo y acciones recomendadas
//   - Gestiona métricas clave para la toma de decisiones
// NOTAS:
//   - Datos mock/estáticos para demostración ejecutiva
//   - KPIs estratégicos con tendencias positivas
//   - Indicadores mensuales con evolución temporal
//   - Resumen ejecutivo con logros y áreas de atención
//   - Acciones recomendadas numeradas y priorizadas
//   - KPIs: Retención, Eficiencia Terminal, Cobertura, Docentes SNI
//   - Métricas mensuales: Matrícula, Aprobación, Satisfacción
//   - TODO: Conectar con servicios reales para datos dinámicos
//   - TODO: Agregar más KPIs estratégicos relevantes (opcional)
// ====================================================

import { Component } from '@angular/core';

@Component({
  selector: 'app-reportes-direccion',
  standalone: false,
  templateUrl: './reportes-direccion.html',
  styleUrls: ['./reportes-direccion.css']
})
export class ReportesDireccion {
  kpis = [
    { titulo: 'Tasa de Retención', valor: '94.5%', tendencia: '+2.3%', icon: '👥', color: 'text-success' },
    { titulo: 'Eficiencia Terminal', valor: '87.2%', tendencia: '+1.8%', icon: '📈', color: 'text-primary' },
    { titulo: 'Cobertura de Programas', valor: '98.1%', tendencia: '+0.5%', icon: '📚', color: 'text-info' },
    { titulo: 'Docentes SNI', valor: '28.8%', tendencia: '+3.2%', icon: '🏆', color: 'text-accent' },
  ];

  indicadoresMensuales = [
    { mes: 'Enero', matricula: 3420, aprobacion: 88.5, satisfaccion: 92.1 },
    { mes: 'Febrero', matricula: 3445, aprobacion: 89.2, satisfaccion: 91.8 },
    { mes: 'Marzo', matricula: 3460, aprobacion: 87.8, satisfaccion: 93.2 },
  ];

  accionesRecomendadas = [
    'Implementar programa de tutorías para mejorar retención',
    'Incentivar publicaciones científicas SNI',
    'Revisar currículos de programas con baja eficiencia',
  ];
}
