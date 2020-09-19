import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
{ path: 'Main', component: MainComponent },
{ path: 'Login', component: LoginComponent },
{ path: 'Signup', component: SignupComponent },
{ path: 'Home', component: HomeComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
