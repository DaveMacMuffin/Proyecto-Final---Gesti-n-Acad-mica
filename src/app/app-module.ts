// ====================================================
// ARCHIVO: app-module.ts
// DESCRIPCIÓN: Módulo principal de la aplicación Angular
// FUNCIONALIDAD: 
//   - Configuración central de la aplicación
//   - Declaración de todos los componentes
//   - Importación de módulos necesarios
//   - Configuración de proveedores de servicios
//   - Bootstrap de la aplicación
// NOTAS:
//   - Módulo raíz de la aplicación (AppModule)
//   - Declara todos los componentes de páginas y layout
//   - Importa módulos esenciales: BrowserModule, AppRoutingModule, FormsModule
//   - Configura ErrorHandler para manejo global de errores
//   - Bootstrap del componente principal: App
//   - Estructura organizada por páginas y componentes de layout)
//   - TODO: Agregar módulos adicionales según necesidades 
//   - TODO: Implementar interceptors para autenticación y logging (opcional)
//   - TODO: Considerar separación en módulos funcionales (según escala de la app)
// ====================================================

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