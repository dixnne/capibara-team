import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { CallToActionComponent } from './call-to-action/call-to-action.component';
import { VideoComponent } from './video/video.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, CallToActionComponent, VideoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
