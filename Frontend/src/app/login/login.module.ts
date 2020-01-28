import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { LoginComponent } from '../partial/login/login.component';
import { SignupComponent } from '../partial/signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
  ],
  declarations: [LoginPage,LoginComponent,SignupComponent]
})
export class LoginPageModule {}
