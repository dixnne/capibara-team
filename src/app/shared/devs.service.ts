import { Injectable } from '@angular/core';
import { Dev } from '../interfaces/dev';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DevsService {
  url: string = "https://capibara.losnarvaez.com/";

  constructor(public http: HttpClient) { }

  addDev(newDev: Dev) {
    const headers = { 'content-type': 'application/json' }  
    return this.http.post<any>(this.url + "devs", {
      dev: newDev
    }, { 
      "headers": headers 
    });
  }

  updateDev(id: string, newDev: Dev) {
    const headers = { 'content-type': 'application/json' }  
    return this.http.put<any>(this.url + "devs/" + id, {
      dev: newDev
    }, { 
      "headers": headers 
    });
  }

  deleteDev(id: string) {
    return this.http.delete<any>(this.url + "devs/" + id);
  }

  getDevs() {
    let devs = [{
      id: "",
      data: {
        name: "",
        details: "",
        image: "",
        tags: [""],
        jobs: [""],
        skills: {
            languages: [""],
            frameworks: [""],
            technologies: [""],
            tools: [""]
        },
        pets: [0]
      }
    }];

    this.http.get<Dev[]>(this.url + "devs").subscribe(resDevs => {
      devs = resDevs;
    });
    return devs;
  }

  getDev(id: string) {
    let dev = {
      id: "",
      data: {
        name: "",
        details: "",
        image: "",
        tags: [""],
        jobs: [""],
        skills: {
            languages: [""],
            frameworks: [""],
            technologies: [""],
            tools: [""]
        },
        pets: [0]
      }
    };

    this.http.get<Dev>(this.url + "devs/" + id).subscribe(resDev => {
      dev = resDev;
    });
    return dev;
  }
}
