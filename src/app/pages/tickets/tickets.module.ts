import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tickets } from './tickets';
import { TicketsRoutingModule } from './tickets-routing.module';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../../components/layout/layout.module';

@NgModule({
    declarations: [Tickets],
    imports: [
        CommonModule,
        FormsModule,
        TicketsRoutingModule,
        LayoutModule
    ]
})
export class TicketsModule {}
