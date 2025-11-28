import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportesAcademico } from './reportes-academico';

const routes: Routes = [
    { path: '', component: ReportesAcademico }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportesAcademicoRoutingModule {}
