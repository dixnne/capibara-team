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
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AdminPetsComponent } from './components/admin/admin-pets/admin-pets.component';
import { AdminDevsComponent } from './components/admin/admin-devs/admin-devs.component';
import { AdminDatesComponent } from './components/admin/admin-dates/admin-dates.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { SignupComponent } from './components/session/signup/signup.component';
import { LoginComponent } from './components/session/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddPetComponent } from './components/admin/add-pet/add-pet.component';
import { AddDevComponent } from './components/admin/add-dev/add-dev.component';
import { AddUserComponent } from './components/admin/add-user/add-user.component';
import { EditPetComponent } from './components/admin/edit-pet/edit-pet.component';
import { EditDevComponent } from './components/admin/edit-dev/edit-dev.component';
import { EditUserComponent } from './components/admin/edit-user/edit-user.component';
import { AdminGraphComponent } from './components/admin/admin-graph/admin-graph.component';
import { Graph1Component } from './components/admin/graph1/graph1.component';


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
  { path: 'admin', component: AdminComponent },
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'admin/pets', component: AdminPetsComponent },
  { path: 'admin/dates', component: AdminDatesComponent },
  { path: 'admin/devs', component: AdminDevsComponent },
  { path: 'admin/users', component: AdminUsersComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'addPet', component: AddPetComponent },
  { path: 'addDev', component: AddDevComponent },
  { path: 'addUser', component: AddUserComponent },
  { path: 'admin/graph', component: AdminGraphComponent},
  { path: 'admin/graph1', component: Graph1Component },
];
