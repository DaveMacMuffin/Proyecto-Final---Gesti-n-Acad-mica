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
    const success = this.username === 'root' && this.password === 'root';

    if (success) {
      alert('Inicio de sesión exitoso'); 
      this.router.navigate(['/']);
    } else {
      alert('Credenciales incorrectas'); 
    }
  }
}
