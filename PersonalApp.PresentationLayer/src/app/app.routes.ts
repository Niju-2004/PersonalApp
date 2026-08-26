import { Routes } from '@angular/router';
import { Loginpage } from './loginpage/loginpage';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: Loginpage },
  { path: 'login', component: Loginpage },
  { path: 'dashboard', component: Dashboard }
];
