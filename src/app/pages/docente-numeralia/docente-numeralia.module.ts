import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocenteNumeralia } from './docente-numeralia';
import { DocenteNumeraliaRoutingModule } from './docente-numeralia-routing.module';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../../components/layout/layout.module';

@NgModule({
    declarations: [DocenteNumeralia],
    imports: [
        CommonModule,
        FormsModule,
        DocenteNumeraliaRoutingModule,
        LayoutModule
    ]
})
export class DocenteNumeraliaModule {}
