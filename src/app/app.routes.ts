import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FactsComponent } from './components/facts/facts.component';
import { BreedsComponent } from './components/breeds/breeds.component';
import { UsComponent } from './pages/us/us.component';
import { VisitComponent } from './components/visit/visit.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'facts', component: FactsComponent },
  { path: 'breeds', component: BreedsComponent },
  { path: 'us', component: UsComponent },
  { path: 'us/:id', component: VisitComponent },
];
