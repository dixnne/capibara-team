import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  images: string[] = [
    "../../../../assets/images/tonton.jpg",
    "../../../../assets/images/dizzy.jpg",
    "../../../../assets/images/pipa.jpg",
    "../../../../assets/images/yuyis.jpg",
    "../../../../assets/images/chimi.jpg",
    "../../../../assets/images/grogu.jpg",
  ];
}
