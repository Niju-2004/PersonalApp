import { Routes } from '@angular/router';
import { Loginpage } from './loginpage/loginpage';
import { Dashboard } from './dashboard/dashboard';
import { Layout } from './layout/layout';
import { Jobs } from './jobs/jobs';
import { UserRegistration } from './user-registration/user-registration';
import { authGuard } from './guard/auth-guard';
import { Savings } from './savings/savings';
import { Profile } from './profile/profile';
import { Tasks } from './tasks/tasks';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Loginpage },
  { path: 'userRegistration', component: UserRegistration },
  {
    path: 'layout',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'jobs', component: Jobs },
      { path: 'savings', component: Savings },
      { path: 'profile', component: Profile },
      { path: 'tasks', component: Tasks }
    ]
  },
  // Shortcut redirects
  { path: 'dashboard', redirectTo: 'layout/dashboard', pathMatch: 'full' },
  { path: 'jobs', redirectTo: 'layout/jobs', pathMatch: 'full' },
  { path: 'savings', redirectTo: 'layout/savings', pathMatch: 'full' },
  { path: 'profile', redirectTo: 'layout/profile', pathMatch: 'full' },
  { path: 'tasks', redirectTo: 'layout/tasks', pathMatch: 'full' },
  
  // Catch-all
  { path: '**', redirectTo: 'login' }
];

