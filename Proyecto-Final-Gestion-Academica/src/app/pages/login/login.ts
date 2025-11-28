// ====================================================
// ARCHIVO: login.ts
// DESCRIPCIÓN: Componente TypeScript del formulario de login
// FUNCIONALIDAD: 
//   - Maneja el estado del formulario de autenticación
//   - Valida credenciales de usuario
//   - Controla la navegación post-autenticación
//   - Gestiona el estado de los campos de usuario y contraseña
// NOTAS:
//   - Autenticación básica con credenciales hardcodeadas
//   - Lógica de validación simple (root/root)
//   - Feedback mediante alerts (temporal)
//   - TODO: Reemplazar con servicio de autenticación real
// ====================================================

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  username = '';
  password = '';

  constructor(private router: Router) {}

  handleSubmit() {
    // Simulación de autenticación
    const success = this.username === 'root' && this.password === 'root';

    if (success) {
      alert('Inicio de sesión exitoso'); 
      this.router.navigate(['/']);
    } else {
      alert('Credenciales incorrectas'); 
    }
  }
}
