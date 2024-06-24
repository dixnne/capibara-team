import { Injectable } from '@angular/core';
import { Dev } from '../interfaces/dev';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DevsService {
  url: string = "https://capibara.losnarvaez.com/";

  constructor(public http: HttpClient) { }

  addDev(newDev: Dev, file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('dev', JSON.stringify(newDev.data));
    let headers = new HttpHeaders();
    headers = headers.append('enctype', 'multipart/form-data');
    console.log(formData);
    return this.http.post<any>(this.url + "devs", formData, { 
      "headers": headers 
    });
  }

  deleteDev(id: string) {
    return this.http.delete<any>(this.url + "devs/" + id);
  }

  getDevs() {
    return this.http.get<Dev[]>(this.url + "devs");
  }

  getDev(id: string) {
    return this.http.get<Dev>(this.url + "devs/" + id);
  }
}
