import { Routes } from '@angular/router';
import { Loginpage } from './loginpage/loginpage';
import { Dashboard } from './dashboard/dashboard';
import { Layout } from './layout/layout';
import { Jobs } from './jobs/jobs';
import { UserRegistration } from './user-registration/user-registration';

export const routes: Routes = [
  { path: '', component: Loginpage },
  { path: 'login', component: Loginpage },
  { path: 'userRegistration', component: UserRegistration },
  {
    path: 'layout', component: Layout,
    children:
      [
        { path: 'dashboard', component: Dashboard },
        { path: 'jobs', component: Jobs }
      ]
  }
];

