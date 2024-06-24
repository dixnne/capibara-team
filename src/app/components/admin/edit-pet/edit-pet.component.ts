import { Component } from '@angular/core';
import { PetsService } from '../../../shared/pets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from '../../../interfaces/pet';

@Component({
  selector: 'app-edit-pet',
  standalone: true,
  imports: [],
  templateUrl: './edit-pet.component.html',
  styleUrl: './edit-pet.component.css'
})
export class EditPetComponent {
  pet?: Pet;
  constructor(
    private petsService: PetsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.petsService.getPet(params["id"]).subscribe(res => {
        this.pet = res;
        console.log(this.pet);
      });
    });
  }
}
