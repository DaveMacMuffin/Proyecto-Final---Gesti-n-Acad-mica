// ====================================================
// ARCHIVO: navbar.ts
// DESCRIPCIÓN: Componente TypeScript de la barra de navegación
// FUNCIONALIDAD: 
//   - Maneja datos del usuario actual
//   - Controla la funcionalidad de logout
//   - Provee datos para el template del navbar
// NOTAS:
//   - Datos de usuario estáticos (temporal - reemplazar con servicio de autenticación)
//   - handleLogout() necesita implementación completa (servicio auth + redirección)
//   - user.role capitalizado automáticamente en template
//   - Usa navbar.css para estilos específicos del componente
// ====================================================

import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  user = { username: 'admin', role: 'administrador' };
  handleLogout() {
    // Implementar logout
    console.log('Logout');
  }
}
