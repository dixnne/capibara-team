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
  curretnDate = new Date();

  constructor(@Inject(DOCUMENT) private document: Document) {
    const localStorage = this.document.defaultView?.localStorage;
    if (localStorage) {
      this.dates = JSON.parse(localStorage.getItem('dates') || '[]');
    }
  }

  saveDate(of: boolean): void {
    if (of != false) {
      localStorage.setItem('actualId', JSON.stringify(this.nextId + 1));
    } else {
      localStorage.setItem('dates', JSON.stringify(this.dates));
    }
  }
  addDate(newDate: DateInfo): void {
    this.dates.push(newDate);
    localStorage.setItem('dates', JSON.stringify(this.dates));
    this.saveDate(true);
  }

  deleteDate(id: number): void {
    //this.dates.removeItem();
    this.dates.splice(
      this.dates.findIndex((date) => {
        date.dateID == id;
      }),
      1
    );
    this.saveDate(false);
  }

  getDates(): DateInfo[] {
    return this.dates;
  }

  getLastDates() {
    console.log(
      ' date from service:  Day  ' +
        this.curretnDate.getUTCDate() +
        '   month   ' +
        this.curretnDate.getMonth() +
        '  year   ' +
        this.curretnDate.getFullYear()
    );
    let i = 0;
    return this.dates.filter(() => {
      //if (this.dates.date.day == this.curretnDate.getDay()) {
      //}
    });
  }

  getNextId(): number {
    this.nextId = parseInt(localStorage.getItem('actualId') || '0');
    return this.nextId;
  }

  getPetDates(id: number): DateInfo[] {
    return this.dates.filter((date) => date.petId == id);
  }
}
