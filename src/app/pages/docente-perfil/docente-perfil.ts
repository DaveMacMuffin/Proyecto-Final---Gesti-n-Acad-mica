// ====================================================
// ARCHIVO: docente-perfil.ts
// DESCRIPCIÓN: Componente TypeScript del Perfil Docente
// FUNCIONALIDAD: 
//   - Maneja el sistema de tabs del perfil docente
//   - Provee datos del historial de clases
//   - Controla información de evaluación docente
//   - Gestiona la navegación entre secciones del perfil
//   - Define la estructura de datos para el template
// NOTAS:
//   - Sistema de tabs con navegación programática
//   - Datos mock/estáticos para demostración
//   - Historial de clases con materias y promedios
//   - Evaluación docente por criterios específicos
//   - Tabs organizadas: CV, Clases, Evaluación, Incidencias
//   - Tab activa por defecto: 'cv' (Curriculum Vitae)
//   - TODO: Conectar con servicios reales para datos dinámicos
//   - TODO: Implementar funcionalidad de edición de perfil
//   - TODO: Agregar manejo de incidencias reales
//   - Iconos representativos mediante emojis genéricos <----- **CAMBIAR POR ICONOS DE MEJOR ESTILO (TODOS LOS ARCHIVOS)**
// ====================================================

import { Component } from '@angular/core';

@Component({
  selector: 'app-docente-perfil',
  standalone: false,
  templateUrl: './docente-perfil.html',
  styleUrls: ['./docente-perfil.css']
})
export class DocentePerfil {
  clases = [
    { materia: 'Cálculo Diferencial', periodo: 'Ene-Jun 2024', promedio: '8.5' },
    { materia: 'Álgebra Lineal', periodo: 'Ago-Dic 2023', promedio: '8.8' },
    { materia: 'Ecuaciones Diferenciales', periodo: 'Ene-Jun 2023', promedio: '8.3' },
  ];

  evaluaciones = [
    { criterio: 'Dominio de la materia', calificacion: '9.2' },
    { criterio: 'Claridad en explicaciones', calificacion: '8.8' },
    { criterio: 'Puntualidad', calificacion: '9.5' },
    { criterio: 'Disponibilidad', calificacion: '8.9' },
  ];

  tabs = [
    { id: 'cv', label: 'Curriculum Vitae' },
    { id: 'clases', label: 'Historial de Clases' },
    { id: 'evaluacion', label: 'Evaluación Docente' },
    { id: 'incidencias', label: 'Incidencias' }
  ];

  activeTab = 'cv';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

}
