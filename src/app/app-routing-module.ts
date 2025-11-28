import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', loadChildren: () => import('./pages/index/index.module').then(m => m.IndexModule) },
  { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'docente-numeralia', loadChildren: () => import('./pages/docente-numeralia/docente-numeralia.module').then(m => m.DocenteNumeraliaModule) },
  { path: 'docente-perfil', loadChildren: () => import('./pages/docente-perfil/docente-perfil.module').then(m => m.DocentePerfilModule) },
  { path: 'docentes', loadChildren: () => import('./pages/docentes/docentes.module').then(m => m.DocentesModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'reportes-academico', loadChildren: () => import('./pages/reportes-academico/reportes-academico.module').then(m => m.ReportesAcademicoModule) },
  { path: 'reportes-direccion', loadChildren: () => import('./pages/reportes-direccion/reportes-direccion.module').then(m => m.ReportesDireccionModule) },
  { path: 'tickets', loadChildren: () => import('./pages/tickets/tickets.module').then(m => m.TicketsModule) },

  { path: '**', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
