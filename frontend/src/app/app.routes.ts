import { Routes } from '@angular/router';
import { HomeComponent } from './GymTracker/components/home/home.component';
import { MachineDetailComponent } from './GymTracker/components/machine-detail/machine-detail.component';
import { MachinesComponent } from './GymTracker/components/machines/machines.component';
import { authGuard } from './routeGuards/auth/auth.guard';
import { antiAuthGuard } from './routeGuards/antiauth/anti-auth.guard';
import { AdminComponent } from './GymTracker/components/admin/admin.component';
import { adminGuard } from './routeGuards/admin/admin.guard';
import { StatisticsComponent } from './GymTracker/components/statistics/statistics.component';
import { HomeComponent as PietHomeComponent } from './PietsBar/components/home/piet.home.cp';

export const routes: Routes = [
  {
    path: '',
    title: 'GymTracker',
    component: HomeComponent,
    canActivate: [antiAuthGuard]
  },
  {
    path: 'Piets',
    title: 'Piet\'s Bar',
    component: PietHomeComponent,
  },
  {
    path: 'machine/:id',
    title: 'GymTracker',
    component: MachineDetailComponent,
    canActivate: [authGuard]
  },
  {
    path: 'machines',
    title: 'GymTracker',
    component: MachinesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    title: 'GymTracker',
    component: AdminComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'statistics',
    title: 'GymTracker',
    component: StatisticsComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    title: 'GymTracker',
    redirectTo: '',
  },
];
