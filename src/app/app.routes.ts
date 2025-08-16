import { Routes } from '@angular/router';
import { LoginComponent} from './components/auth/login/login';
import { RegisterComponent } from './components/auth/register/register';
import { DashboardComponent } from './components/dashboard/dashboard';
import { HistorialComponent } from './components/plagas/historial/historial';
import { RegistroComponent } from './components/plagas/registro/registro';



export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'historial', component: HistorialComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '**', redirectTo: 'login' }
];
