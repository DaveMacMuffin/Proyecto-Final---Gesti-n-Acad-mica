import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocentePerfil } from './docente-perfil';

const routes: Routes = [
    { path: '', component: DocentePerfil }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DocentePerfilRoutingModule {}
