import { Component } from '@angular/core';
import { PetsService } from '../../../shared/pets.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Pet } from '../../../interfaces/pet';
import { CommonModule } from '@angular/common';
import { DateInfo } from '../../../interfaces/date';
import { DatesService } from '../../../shared/dates.service';

@Component({
  selector: 'app-pet',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './pet.component.html',
  styleUrl: './pet.component.css'
})
export class PetComponent {

  petIndex: number = 0;
  pet!: Pet;
  petDates!: DateInfo[];
  searchName!: string;

  constructor(private petsService: PetsService, private datesService: DatesService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.petIndex = this.petsService.getPetIndex(params["name"]);
      this.searchName = params['name'];
      if (this.petIndex != -1){
        this.pet = this.petsService.getAPet(this.petIndex); 
        this.petDates = this.datesService.getPetDates(this.petIndex);
      }
    });
  }
}
