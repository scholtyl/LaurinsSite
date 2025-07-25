import { Routes } from '@angular/router';
import { HomeComponent as GymTrackerHomeComponent } from './GymTracker/components/home/home.component';
import { MachineDetailComponent } from './GymTracker/components/machine-detail/machine-detail.component';
import { MachinesComponent } from './GymTracker/components/machines/machines.component';
import { authGuard } from './routeGuards/auth/auth.guard';
import { antiAuthGuard } from './routeGuards/antiauth/anti-auth.guard';
import { AdminComponent } from './GymTracker/components/admin/admin.component';
import { adminGuard } from './routeGuards/admin/admin.guard';
import { StatisticsComponent } from './GymTracker/components/statistics/statistics.component';
import { HomeComponent as PietHomeComponent } from './PietsBar/components/home/piet.home.cp';
import { HomeComponent } from './globalComponents/home/global.home.cp';

export const routes: Routes = [
  {
    path: '',
    title: "Laurin's Site",
    component: HomeComponent,
    data: { title: "Laurin's Site" },
  },
  {
    path: 'Piets',
    title: "Piet's Bar",
    component: PietHomeComponent,
    data: { title: "Piet's Bar" },
  },
  {
    path: 'GymTracker',
    title: 'GymTracker',
    component: GymTrackerHomeComponent,
    canActivate: [antiAuthGuard],
    data: { title: 'Gym Tracker' },
  },
  {
    path: 'GymTracker/machine/:id',
    title: 'GymTracker',
    component: MachineDetailComponent,
    canActivate: [authGuard],
    data: { title: 'Gym Tracker' },
  },
  {
    path: 'GymTracker/machines',
    title: 'GymTracker',
    component: MachinesComponent,
    canActivate: [authGuard],
    data: { title: 'Gym Tracker' },
  },
  {
    path: 'GymTracker/admin',
    title: 'GymTracker',
    component: AdminComponent,
    canActivate: [adminGuard],
    data: { title: 'Gym Tracker' },
  },
  {
    path: 'GymTracker/statistics',
    title: 'GymTracker',
    component: StatisticsComponent,
    canActivate: [authGuard],
    data: { title: 'Gym Tracker' },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
