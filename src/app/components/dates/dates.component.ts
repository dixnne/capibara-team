import { Component } from '@angular/core';
import { Pet } from '../../interfaces/pet';
import { PetsService } from '../../shared/pets.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DateInfo } from '../../interfaces/date';
import { DatesService } from '../../shared/dates.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dates',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './dates.component.html',
  styleUrl: './dates.component.css',
})
export class DatesComponent {
  dates: DateInfo[] = [];
  datesP: DateInfo[] = [];
  datesN: DateInfo[] = [];
  today: Date = new Date();

  constructor(
    public petsService: PetsService,
    public activatedRoute: ActivatedRoute,
    private datesService: DatesService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.dates = this.datesService.getUserDates("");

      this.datesP = this.dates.filter(date => {
        if (date.data.date.year < this.today.getFullYear()) {
          return true;
        } else {
          if (date.data.date.year == this.today.getFullYear()) {
            if (date.data.date.month < this.today.getMonth() + 1) {
              return true;
            } else {
              if (date.data.date.month == this.today.getMonth() + 1) {
                if (date.data.date.day < this.today.getUTCDate()) {
                  return true;
                } else {
                  return false;
                }
              } else {
                return false;
              }
            }
          } else {
            return false;
          }
        }
      });
      this.datesN = this.dates.filter(date => {
        if (date.data.date.year > this.today.getFullYear()) {
          return true;
        } else {
          if (date.data.date.year == this.today.getFullYear()) {
            if (date.data.date.month > this.today.getMonth() + 1) {
              return true;
            } else {
              if (date.data.date.month == this.today.getMonth() + 1) {
                if (date.data.date.day >= this.today.getUTCDate()) {
                  return true;
                } else {
                  return false;
                }
              } else {
                return false;
              }
            }
          } else {
            return false;
          }
        }
      });
    });
  }

  getPetImage(id: string): string {
    let pet = "";
    this.petsService.getPet(id).subscribe(res => {
      pet = res.data.img;
    });
    return pet;
  }

  getPetName(id: string): string {
    let pet = "";
    this.petsService.getPet(id).subscribe(res => {
      pet = res.data.name;
    });
    return pet;
  }
}
