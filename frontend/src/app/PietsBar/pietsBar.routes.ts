import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/piet.home.cp';

export const pietsBarRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: "Piet's Bar" }
  }
];
