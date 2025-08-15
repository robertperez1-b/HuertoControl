import { Routes } from '@angular/router';
import { LoginComponent } from '.components/auth/login/login';
import { RegisterComponent } from './register/register';
import { DashboardComponent } from './dashboard/dashboard';
import { HistorialComponent } from './historial/historial';
import { RegistroComponent } from './registro/registro';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro-usuario', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'historial', component: HistorialComponent },
  { path: 'registro-plaga', component: RegistroComponent },
  { path: '**', redirectTo: 'login' }
];
