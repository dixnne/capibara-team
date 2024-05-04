import { Component } from '@angular/core';
import { InfoComponent } from '../info/info.component';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [InfoComponent, CarouselComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
}
