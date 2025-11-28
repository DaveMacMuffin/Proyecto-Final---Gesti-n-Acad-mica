import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocenteNumeralia } from './docente-numeralia';

const routes: Routes = [
    { path: '', component: DocenteNumeralia }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DocenteNumeraliaRoutingModule {}
