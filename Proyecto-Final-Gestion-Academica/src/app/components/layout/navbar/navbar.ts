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
