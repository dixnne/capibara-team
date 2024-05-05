import { Injectable } from '@angular/core';
import { DateInfo } from '../interfaces/date';
import { Pet } from '../interfaces/pet';
import { Pets } from '../data/pets';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  constructor() {}

  dates!: DateInfo[];
  nextId!: number;
  pets: Pet[] = Pets;

  addDate(newDate: DateInfo): void {
    this.getDates();
    newDate.dateID = this.nextId;
    this.dates.push(newDate);
    localStorage.setItem('dates', JSON.stringify(this.dates));
    this.getNextId();
    localStorage.setItem('actualId', JSON.stringify(this.nextId));
  }

  deleteDate(id: number): void {
    this.getDates();
    this.dates.splice(this.dates.findIndex(date => {
      date.dateID == id;
    }), 1);
  }

  getDates(): void {
    this.dates = JSON.parse(localStorage.getItem('dates') || '[]');
  }

  getNextId(): void {
    this.nextId = parseInt(localStorage.getItem('actualId') || '0') + 1;
  }

  getPetDates(pet: string): DateInfo[] {
    this.getDates();
    let foundPet = this.pets.find(p => p.name == pet);
    return this.dates.filter(date => date.petId == foundPet?.id);
  }
}
