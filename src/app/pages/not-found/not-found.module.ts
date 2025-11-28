import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFound } from './not-found';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { LayoutModule } from '../../components/layout/layout.module';

@NgModule({
    declarations: [NotFound],
    imports: [
        CommonModule,
        NotFoundRoutingModule,
        LayoutModule
    ]
})
export class NotFoundModule {}
