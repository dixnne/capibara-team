import { Inject, Injectable } from '@angular/core';
import { DateInfo } from '../interfaces/date';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DatesService {
  url: string = "https://capibara.losnarvaez.com/";

  constructor(public http: HttpClient) { }

  addDate(newDate: DateInfo) {
    const headers = { 'content-type': 'application/json' }  
    return this.http.post<any>(this.url + "dates", {
      date: newDate
    }, { 
      "headers": headers 
    });
  }

  deleteDate(id: string) {
    return this.http.delete<any>(this.url + "dates/" + id);
  }

  getDates() {
    return this.http.get<DateInfo[]>(this.url + "dates");
  }

  getDate(id: string) {
    return this.http.get<DateInfo>(this.url + "dates/" + id);
  }

  getPetDates(pet: string) {
    return this.http.get<DateInfo[]>(this.url + "dates?pet=" + pet);
  }

  getUserDates(user: string) {
    return this.http.get<DateInfo[]>(this.url + "dates?user=" + user);
  }
}
