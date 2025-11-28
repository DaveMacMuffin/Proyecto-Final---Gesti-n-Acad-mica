import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesDireccion } from './reportes-direccion';
import { ReportesDireccionRoutingModule } from './reportes-direccion-routing.module';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../../components/layout/layout.module';

@NgModule({
    declarations: [ReportesDireccion],
    imports: [
        CommonModule,
        FormsModule,
        ReportesDireccionRoutingModule,
        LayoutModule
    ]
})
export class ReportesDireccionModule {}
