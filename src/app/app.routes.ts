import { Routes } from '@angular/router';
import { ServiceDeskDashboard } from './service-desk-dashboard/service-desk-dashboard';
import { TicketList } from './ticket-list/ticket-list';
import { KanbanBoard } from './kanban-board/kanban-board';

export const routes: Routes = [
  { path: '', component: ServiceDeskDashboard },
  { path: 'dashboard', component: ServiceDeskDashboard },
  { path: 'tickets', component: TicketList },
  { path: 'kanban', component: KanbanBoard }
];
