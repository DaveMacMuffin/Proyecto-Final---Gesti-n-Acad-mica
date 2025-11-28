
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { App } from './app';

// Importación de todas las paginas
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
import { Navbar } from './components/layout/navbar/navbar';
import { Sidebar } from './components/layout/sidebar/sidebar';
import { Footer } from './components/layout/footer/footer';

@NgModule({
  declarations: [
    App,
    Index,
    Dashboard,
    DocenteNumeralia,
    DocentePerfil,
    Docentes,
    Login,
    NotFound,
    ReportesAcademico,
    ReportesDireccion,
    Tickets,
    Navbar,
    Sidebar,
    Footer
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    { provide: ErrorHandler }
  ],
  bootstrap: [App]
})
export class AppModule {}