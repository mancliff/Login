import { importExpr } from '@angular/compiler/src/output/output_ast';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {PageOneComponent} from './page-one/page-one.component';
import {AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import { AngularFireAuth } from '@angular/fire/auth';
import { HomePageComponent } from './home-page/home-page.component';


const redirectUnauthorizedLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {path:'', redirectTo: '/home', pathMatch:'full'},
  {
    path : 'login', component: LoginComponent
  },
  {
    path : 'register', component: RegisterComponent
  },
  {
    path : 'page-one', component: PageOneComponent,
    canActivate: [AngularFireAuthGuard], 
    data: {authGuardPipe: redirectUnauthorizedLogin}
  },
  {
    path : 'home', component: HomePageComponent
  },

] 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
