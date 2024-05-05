import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetsService } from '../../shared/pets.service';
import { Pet } from '../../interfaces/pet';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-visit',
  standalone: true,
  imports: [StepperModule, ButtonModule, FormsModule, CalendarModule],
  templateUrl: './visit.component.html',
  styleUrl: './visit.component.css',
})
export class VisitComponent {
  @Input() pet!: Pet;
  idx: number = 0;
  date2: Date | undefined;
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
