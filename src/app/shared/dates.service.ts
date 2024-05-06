import { Injectable } from '@angular/core';
import { DateInfo } from '../interfaces/date';
import { Pet } from '../interfaces/pet';
import { Pets } from '../data/pets';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  dates!: DateInfo[];
  nextId!: number;
  pets: Pet[] = Pets;
  
  constructor() {
    this.dates = JSON.parse(localStorage.getItem('dates') || '[]');
  }

  addDate(newDate: DateInfo): void {
    newDate.dateID = this.nextId;
    this.dates.push(newDate);
    localStorage.setItem('dates', JSON.stringify(this.dates));
    this.getNextId();
    localStorage.setItem('actualId', JSON.stringify(this.nextId));
  }

  deleteDate(id: number): void {
    this.dates.splice(this.dates.findIndex(date => {
      date.dateID == id;
    }), 1);
  }

  getDates(): DateInfo[] {
    return this.dates;
  }

  getNextId(): void {
    this.nextId = parseInt(localStorage.getItem('actualId') || '0') + 1;
  }

  getPetDates(id: number): DateInfo[] {
    return this.dates.filter(date => date.petId == id);
  }
}
