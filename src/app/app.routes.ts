import { Routes } from '@angular/router';
import { ServiceDeskDashboard } from './service-desk-dashboard/service-desk-dashboard';

export const routes: Routes = [
  { path: '', component: ServiceDeskDashboard },
  { path: 'dashboard', component: ServiceDeskDashboard }
];
