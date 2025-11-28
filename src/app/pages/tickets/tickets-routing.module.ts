import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tickets } from './tickets';

const routes: Routes = [
    { path: '', component: Tickets }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TicketsRoutingModule {}
