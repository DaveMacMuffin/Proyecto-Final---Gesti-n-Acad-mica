import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Docentes } from './docentes';

const routes: Routes = [
    { path: '', component: Docentes }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DocentesRoutingModule {}
