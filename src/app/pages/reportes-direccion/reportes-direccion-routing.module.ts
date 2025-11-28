import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportesDireccion } from './reportes-direccion';

const routes: Routes = [
    { path: '', component: ReportesDireccion }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportesDireccionRoutingModule {}
