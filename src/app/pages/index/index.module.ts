import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Index } from './index';
import { IndexRoutingModule } from './index-routing.module';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../../components/layout/layout.module';

@NgModule({
    declarations: [Index],
    imports: [
        CommonModule,
        FormsModule,
        IndexRoutingModule,
        LayoutModule
    ]
})
export class IndexModule {}
