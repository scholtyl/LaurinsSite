import { Routes } from '@angular/router';
import { HomeComponent } from './globalComponents/home/global.home.cp';
import { pietsBarRoutes } from './PietsBar/pietsBar.routes';
import { gymTrackerRoutes } from './GymTracker/gymTracker.routes';

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
    children: pietsBarRoutes,
  },
  {
    path: 'GymTracker',
    title: 'GymTracker',
    children: gymTrackerRoutes,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
