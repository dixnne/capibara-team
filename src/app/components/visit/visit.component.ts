import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetsService } from '../../shared/pets.service';
import { Pet } from '../../interfaces/pet';

@Component({
  selector: 'app-visit',
  standalone: true,
  imports: [],
  templateUrl: './visit.component.html',
  styleUrl: './visit.component.css',
})
export class VisitComponent {
  @Input() pet!: Pet;
  idx: number = 0;
  constructor(
    public petsService: PetsService,
    public activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.pet = petsService.getAPet(params['id']);
      this.idx = params['id'];
    });
  }
}
