import { Component } from '@angular/core';
import { PetsService } from '../../../shared/pets.service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { DatesService } from '../../../shared/dates.service';
import { Pet } from '../../../interfaces/pet';
import { DateInfo } from '../../../interfaces/date';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './date.component.html',
  styleUrl: './date.component.css',
})
export class DateComponent {
  pets: Pet[] = [];
  petId: number = 0;
  dates: DateInfo[] = [];
  dateId: number = 0;
  dateIndex: number = 0;

  constructor(
    public petsService: PetsService,
    public activatedRoute: ActivatedRoute,
    private datesService: DatesService,
    public router: Router
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.dateId = params['id'];
      this.dates = this.datesService.getDates();
      this.pets = petsService.getPets();
      this.dateIndex = this.dates.findIndex((d) => d.dateID == this.dateId);
      this.petId = this.dates[this.dateIndex].petId;
    });
  }

  deleteDate(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You could lose the opportunity of your life!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.datesService.deleteDate(this.dateId);
        Swal.fire({
          title: 'Date canceled',
          text: 'Please reconsider this, you could be a hero...',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/dates']);
        });
      }
    });
  }
}
