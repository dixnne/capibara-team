import { Component } from '@angular/core';
import { Pet } from '../../interfaces/pet';
import { PetsService } from '../../shared/pets.service';
import { RouterLink } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [RouterLink, PaginatorModule, CommonModule],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.css',
})
export class PetsComponent {
  myPets: Pet[] = [];
  imgURL: string = "https://capibara.losnarvaez.com/";
  constructor(public petService: PetsService) {}

  ngOnInit(): void {
    this.petService.getPets().subscribe(res => {
      this.myPets = res;
    });
  }
}
