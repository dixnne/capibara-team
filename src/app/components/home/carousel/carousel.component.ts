import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { PetsService } from '../../../shared/pets.service';
import { Pet } from '../../../interfaces/pet';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CarouselModule, RouterLink],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {

  pets: Pet[] = [];

  constructor(private petsService: PetsService) {
    this.pets = this.petsService.getPets();
  }
}
