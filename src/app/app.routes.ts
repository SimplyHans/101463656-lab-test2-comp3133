import { Routes } from '@angular/router';
import { MissiondetailsComponent } from './components/missiondetails/missiondetails';
import { MissionlistComponent } from './components/missionlist/missionlist';

export const routes: Routes = [
  { path: '', component: MissionlistComponent },
  { path: 'mission/:id', component: MissiondetailsComponent },
  { path: '**', redirectTo: '' },
];
