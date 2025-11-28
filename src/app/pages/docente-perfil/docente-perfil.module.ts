import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocentePerfil } from './docente-perfil';
import { DocentePerfilRoutingModule } from './docente-perfil-routing.module';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../../components/layout/layout.module';

@NgModule({
    declarations: [DocentePerfil],
    imports: [
        CommonModule,
        FormsModule,
        DocentePerfilRoutingModule,
        LayoutModule
    ]
})
export class DocentePerfilModule {}
