import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesAcademico } from './reportes-academico';
import { ReportesAcademicoRoutingModule } from './reportes-academico-routing.module';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../../components/layout/layout.module';

@NgModule({
    declarations: [ReportesAcademico],
    imports: [
        CommonModule,
        FormsModule,
        ReportesAcademicoRoutingModule,
        LayoutModule
    ]
})
export class ReportesAcademicoModule {}
