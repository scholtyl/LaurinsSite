import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { MachinesComponent } from "./components/machines/machines.component";
import { MachineDetailComponent } from "./components/machine-detail/machine-detail.component";
import { AdminComponent } from "./components/admin/admin.component";
import { StatisticsComponent } from "./components/statistics/statistics.component";
import { antiAuthGuard } from "./routeGuards/antiauth/anti-auth.guard";
import { authGuard } from "./routeGuards/auth/auth.guard";
import { adminGuard } from "./routeGuards/admin/admin.guard";

export const gymTrackerRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [antiAuthGuard],
    data: { title: 'Gym Tracker' },
  },
  {
    path: 'machines',
    component: MachinesComponent,
    canActivate: [authGuard],
    data: { title: 'Gym Tracker' },
  },
  {
    path: 'machine/:id',
    component: MachineDetailComponent,
    canActivate: [authGuard],
    data: { title: 'Gym Tracker' },
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard],
    data: { title: 'Gym Tracker' },
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
    canActivate: [authGuard],
    data: { title: 'Gym Tracker' },
  }
];
