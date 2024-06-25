import { Component, ElementRef } from '@angular/core';
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
import { SpeechService } from './shared/speech.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';

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
    FooterComponent,
    CommonModule,
    SpinnerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'capibara-team';
  invert: boolean = false;
  fontSize: string = "1rem";
  colorBlindness: string = "";
  innerText: string = "";

  constructor(private el: ElementRef, private speechService: SpeechService) {}

  ngAfterViewInit() {
    this.innerText = this.el.nativeElement.innerText;
    console.log(this.innerText);
  }

  handleFontSize(fs: string) {
    this.fontSize = fs;
  }

  handleInvert(inv: boolean) {
    this.invert = inv;
  }

  handleColorBlindness(cb: string) {
    this.colorBlindness = cb;
  }

  handleSpeak(state: string) {
    switch (state) {
      case 'start':
        this.speechService.start(this.innerText);
        break;
      case 'pause':
        this.speechService.pause();
        break;
      case 'resume':
        this.speechService.resume();
        break;
      case 'cancel':
        this.speechService.cancel();
        break;
      default:
        break;
    }
  }
}
