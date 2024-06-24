import { Injectable } from '@angular/core';
import { Pet } from '../interfaces/pet';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  url: string = "https://capibara.losnarvaez.com/";

  constructor(public http: HttpClient) { }

  addPet(newPet: Pet, file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('pet', JSON.stringify(newPet.data));
    let headers = new HttpHeaders();
    headers = headers.append('enctype', 'multipart/form-data');
    console.log(formData);
    return this.http.post<any>(this.url + "pets", formData, { 
      "headers": headers 
    });
  }

  deletePet(id: string) {
    return this.http.delete<any>(this.url + "pets/" + id);
  }

  getPets() {
    return this.http.get<Pet[]>(this.url + "pets");
  }

  getPet(id: string) {
    return this.http.get<Pet>(this.url + "pets/" + id);
  }

  getPetByName(name: string) {
    return this.http.get<Pet>(this.url + "pets?name=" + name);
  }

  getPetsByTag(tag: string) {
    return this.http.get<Pet[]>(this.url + "pets?tag=" + tag);
  }
}
