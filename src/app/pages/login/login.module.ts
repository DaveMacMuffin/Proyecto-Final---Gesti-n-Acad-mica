import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from './login';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../../components/layout/layout.module';


@NgModule({
    declarations: [Login],
    imports: [
        CommonModule,
        FormsModule,
        LoginRoutingModule,
        LayoutModule
    ]
})
export class LoginModule {}
