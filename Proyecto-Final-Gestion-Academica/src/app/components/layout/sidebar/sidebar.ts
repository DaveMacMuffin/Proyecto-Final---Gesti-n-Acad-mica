

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
export class Sidebar {
  hoveredItem: string | null = null;
  hoveredSubitem: string | null = null;
  menuItems: MenuItem[] = [
    { title: 'Pagina Principal', icon: '📄', path: '/dashboard' },
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
      path: '',
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
