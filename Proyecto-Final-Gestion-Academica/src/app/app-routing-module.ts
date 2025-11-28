
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importación de todas las páginas
import { Index } from './pages/index/index';
import { Dashboard } from './pages/dashboard/dashboard';
import { DocenteNumeralia } from './pages/docente-numeralia/docente-numeralia';
import { DocentePerfil } from './pages/docente-perfil/docente-perfil';
import { Docentes } from './pages/docentes/docentes';
import { Login } from './pages/login/login';
import { NotFound } from './pages/not-found/not-found';
import { ReportesAcademico } from './pages/reportes-academico/reportes-academico';
import { ReportesDireccion } from './pages/reportes-direccion/reportes-direccion';
import { Tickets } from './pages/tickets/tickets';


const routes: Routes = [
  { path: '', component: Index },
  { path: 'dashboard', component: Dashboard },
  { path: 'docente-numeralia', component: DocenteNumeralia },
  { path: 'docente-perfil', component: DocentePerfil },
  { path: 'docentes', component: Docentes },
  { path: 'login', component: Login },
  { path: 'reportes-academico', component: ReportesAcademico },
  { path: 'reportes-direccion', component: ReportesDireccion },
  { path: 'tickets', component: Tickets },

  // Página 404
  { path: '**', component: NotFound },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

