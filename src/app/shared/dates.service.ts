import { Inject, Injectable } from '@angular/core';
import { DateInfo } from '../interfaces/date';
import { Pet } from '../interfaces/pet';
import { Pets } from '../data/pets';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DatesService {
  dates: DateInfo[] = [];
  nextId!: number;
  pets: Pet[] = Pets;

  constructor(@Inject(DOCUMENT) private document: Document) {
    const localStorage = this.document.defaultView?.localStorage;
    if (localStorage) {
      this.dates = JSON.parse(localStorage.getItem('dates') || '[]');
    }
  }

  addDate(newDate: DateInfo): void {
    this.dates.push(newDate);
    localStorage.setItem('dates', JSON.stringify(this.dates));
    localStorage.setItem('actualId', JSON.stringify(this.nextId + 1));
  }

  deleteDate(id: number): void {
    this.dates.splice(
      this.dates.findIndex((date) => {
        date.dateID == id;
      }),
      1
    );
  }

  getDates(): DateInfo[] {
    return this.dates;
  }

  getNextId(): number {
    this.nextId = parseInt(localStorage.getItem('actualId') || '0');
    return this.nextId;
  }

  getPetDates(id: number): DateInfo[] {
    return this.dates.filter((date) => date.petId == id);
  }
}
