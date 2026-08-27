import { Routes } from '@angular/router';
import { Loginpage } from './loginpage/loginpage';
import { Dashboard } from './dashboard/dashboard';
import { Layout } from './layout/layout';
import path from 'node:path/win32';

export const routes: Routes = [
  { path: '', component: Loginpage },
  { path: 'login', component: Loginpage },
  { path: 'dashboard', component: Dashboard },
  {
    path: 'layout', component: Layout,
    children:
      [
        {
          path: 'dashboard', component: Dashboard
        }
      ]
  }
];
