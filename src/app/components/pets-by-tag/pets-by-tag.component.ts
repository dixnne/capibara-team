import { Component, Input } from '@angular/core';
import { PetsService } from '../../shared/pets.service';
import { Pet } from '../../interfaces/pet';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pets-by-tag',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './pets-by-tag.component.html',
  styleUrl: './pets-by-tag.component.css',
})
export class PetsByTagComponent {
  @Input() tag!: string;
  tagPets: Pet[] = [];
  imgURL: string = "https://capibara.losnarvaez.com/";
  idx: number = 0;
  constructor(
    public petsService: PetsService,
    public activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.petsService.getPetsByTag(params['tag']).subscribe(res => {
        this.tagPets = res;
        this.filterPets(params["tag"]);
      });
      console.log(this.tagPets);
    });
  }

  filterPets(tag: string) {
    const filteredPets = this.tagPets.filter((pet) => {
      return pet.data.tag.find(t => t == tag);
    });
    this.tagPets = filteredPets;
  }
}
