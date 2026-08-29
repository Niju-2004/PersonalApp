import { Routes } from '@angular/router';
import { Loginpage } from './loginpage/loginpage';
import { Dashboard } from './dashboard/dashboard';
import { Layout } from './layout/layout';
import { Jobs } from './jobs/jobs';

export const routes: Routes = [
  { path: '', component: Loginpage },
  { path: 'login', component: Loginpage },
  {
    path: 'layout', component: Layout,
    children:
      [
        { path: 'dashboard', component: Dashboard },
        { path: 'jobs', component: Jobs }
      ]
  }
];

