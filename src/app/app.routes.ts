import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FactsComponent } from './components/facts/facts.component';
import { BreedsComponent } from './components/breeds/breeds.component';
import { VisitComponent } from './components/visit/visit.component';
import { TeamComponent } from './components/team/team.component';
import { PetsComponent } from './components/pets/pets.component';
import { AboutComponent } from './components/about/about.component';
import { DatesComponent } from './components/dates/dates.component';
import { PetsByTagComponent } from './components/pets-by-tag/pets-by-tag.component';
import { DateComponent } from './components/dates/date/date.component';
import { DevComponent } from './components/team/dev/dev.component';
import { PetComponent } from './components/search/pet/pet.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'facts', component: FactsComponent },
  { path: 'breeds', component: BreedsComponent },
  { path: 'pets', component: PetsComponent },
  { path: 'team', component: TeamComponent },
  { path: 'dates', component: DatesComponent },
  { path: 'us/:id', component: VisitComponent },
  { path: 'dev/:id', component: DevComponent },
  { path: 'tagpet/:tag', component: PetsByTagComponent },
  { path: 'date/:id', component: DateComponent },
  { path: 'search/:name', component: PetComponent },
];
