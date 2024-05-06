import { Component } from '@angular/core';
import { PetsService } from '../../../shared/pets.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatesService } from '../../../shared/dates.service';
import { Pet } from '../../../interfaces/pet';
import { DateInfo } from '../../../interfaces/date';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './date.component.html',
  styleUrl: './date.component.css'
})
export class DateComponent {
  pets!: Pet[];
  petId: number = 0;
  dates: DateInfo[] = [];
  dateId: number = 0;
  dateIndex: number = 0;

  constructor(
    public petsService: PetsService,
    public activatedRoute: ActivatedRoute,
    private datesService: DatesService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.dateId = params['id'];
      this.dates = this.datesService.getDates();
      this.pets = petsService.getPets();
      this.dateIndex = this.dates.findIndex(d => d.dateID == this.dateId);
      this.petId = this.dates[this.dateIndex].petId;
    });
  }
}
