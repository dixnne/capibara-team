import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FactsComponent } from './components/facts/facts.component';
import { BreedsComponent } from './components/breeds/breeds.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PetsComponent } from './components/pets/pets.component';
import { TeamComponent } from './components/team/team.component';
import { AboutComponent } from './components/about/about.component';
import { DatesComponent } from './components/dates/dates.component';
import { VisitComponent } from './components/visit/visit.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    HomeComponent, 
    FactsComponent, 
    BreedsComponent, 
    NavbarComponent, 
    PetsComponent, 
    TeamComponent, 
    AboutComponent, 
    DatesComponent, 
    VisitComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'capibara-team';
}
