import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dashboard } from './dashboard';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../../components/layout/layout.module';

@NgModule({
    declarations: [Dashboard],
    imports: [
        CommonModule,
        FormsModule,
        DashboardRoutingModule,
        LayoutModule
    ]
})
export class DashboardModule {}
