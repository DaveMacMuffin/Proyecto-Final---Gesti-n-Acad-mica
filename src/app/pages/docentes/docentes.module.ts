import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Docentes } from './docentes';
import { DocentesRoutingModule } from './docentes-routing.module';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../../components/layout/layout.module';

@NgModule({
    declarations: [Docentes],
    imports: [
        CommonModule,
        FormsModule,
        DocentesRoutingModule,
        LayoutModule
    ]
})
export class DocentesModule {}
