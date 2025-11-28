// ====================================================
// ARCHIVO: sidebar.ts
// DESCRIPCIÓN: Componente TypeScript de la barra lateral
// FUNCIONALIDAD: 
//   - Define la estructura del menú de navegación
//   - Maneja estados hover para items y subitems
//   - Controla la detección de ruta activa
//   - Provee datos de navegación al template
// NOTAS:
//   - Interface MenuItem para tipado fuerte de la estructura del menú
//   - Navegación jerárquica con items y submenús
//   - Estados hover manejados con variables reactivas
//   - isActive() básico
// ====================================================

import { Component } from '@angular/core';

interface MenuItem {
  title: string;
  icon: string;
  path: string;
  submenu?: { title: string; path: string }[];
}

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class SidebarComponent {
  hoveredItem: string | null = null;
  hoveredSubitem: string | null = null;
  menuItems: MenuItem[] = [
    { title: 'Dashboard', icon: '📊', path: '/dashboard' },
    {
      title: 'BD Docente', 
      icon: '👥',
      path: '/docentes',
      submenu: [
        { title: 'Tablero Docentes', path: '/docentes' },
        { title: 'Perfil Docente', path: '/docente-perfil' },
        { title: 'Numeralia', path: '/docente-numeralia' }
      ]
    },
    { title: 'Tickets', icon: '⚠️', path: '/tickets' },
    {
      title: 'Reportes',
      icon: '📈',
      path: '/reportes',
      submenu: [
        { title: 'Dashboard Académico', path: '/reportes-academico' },
        { title: 'Dashboard Dirección', path: '/reportes-direccion' }
      ]
    }
  ];

  isActive(path: string): boolean {
    return window.location.pathname === path;
  }
}
