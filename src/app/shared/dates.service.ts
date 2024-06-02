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

  updateDate(id: string, newDate: DateInfo) {
    const headers = { 'content-type': 'application/json' }  
    return this.http.put<any>(this.url + "dates/" + id, {
      date: newDate
    }, { 
      "headers": headers 
    });
  }

  deleteDate(id: string) {
    return this.http.delete<any>(this.url + "dates/" + id);
  }

  getDates() {
    let dates = [{
      id: "",
      data: {
        petId: "",
        userId: "",
        date: {
            day: 0,
            month: 0,
            year: 0,
            hour: ""
        },
      }
    }];

    this.http.get<DateInfo[]>(this.url + "dates").subscribe(resDates => {
      dates = resDates;
    });

    return dates;
  }

  getDate(id: string) {
    let date = {
      id: "",
      data: {
        petId: "",
        userId: "",
        date: {
            day: 0,
            month: 0,
            year: 0,
            hour: ""
        }
      }
    };
    this.http.get<DateInfo>(this.url + "dates/" + id).subscribe(resDate => {
      date = resDate;
    });

    return date;
  }

  getPetDates(pet: string) {
    let dates = [{
      id: "",
      data: {
        petId: "",
        userId: "",
        date: {
            day: 0,
            month: 0,
            year: 0,
            hour: ""
        },
      }
    }];

    this.http.get<DateInfo[]>(this.url + "dates?pet=" + pet).subscribe(resDates => {
      dates = resDates;
    });

    return dates;
  }

  getUserDates(user: string) {
    let dates = [{
      id: "",
      data: {
        petId: "",
        userId: "",
        date: {
            day: 0,
            month: 0,
            year: 0,
            hour: ""
        },
      }
    }];

    this.http.get<DateInfo[]>(this.url + "dates?user=" + user).subscribe(resDates => {
      dates = resDates;
    });

    return dates;
  }
}
