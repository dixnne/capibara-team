import { Injectable } from '@angular/core';
import { Pet } from '../interfaces/pet';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  url: string = "https://capibara.losnarvaez.com/";

  constructor(public http: HttpClient) { }

  addPet(newPet: Pet) {
    const headers = { 'content-type': 'application/json' }  
    return this.http.post<any>(this.url + "pets", {
      pet: newPet
    }, { 
      "headers": headers 
    });
  }

  updatePet(id: string, newPet: Pet) {
    const headers = { 'content-type': 'application/json' }  
    return this.http.put<any>(this.url + "pets/" + id, {
      pet: newPet
    }, { 
      "headers": headers 
    });
  }

  deletePet(id: string) {
    return this.http.delete<any>(this.url + "pets/" + id);
  }

  getPets() {
    let pets = [{
      id: "",
      data: {
        name: "",
        age: 0,
        color: "",
        breed: "",
        stay: "",
        details: "",
        img: "",
        tag: [""]
      }
    }];

    this.http.get<Pet[]>(this.url + "pets").subscribe(resPets => {
      pets = resPets;
    });

    return pets;
  }

  getPet(id: string) {
    let pet = {
      id: "",
      data: {
        name: "",
        age: 0,
        color: "",
        breed: "",
        stay: "",
        details: "",
        img: "",
        tag: [""]
      }
    };

    this.http.get<Pet>(this.url + "pets/" + id).subscribe(resPet => {
      pet = resPet;
    });

    return pet;
  }

  getPetByName(name: string) {
    let pet = {
      id: "",
      data: {
        name: "",
        age: 0,
        color: "",
        breed: "",
        stay: "",
        details: "",
        img: "",
        tag: [""]
      }
    };

    this.http.get<Pet>(this.url + "pets?name=" + name).subscribe(resPet => {
      pet = resPet;
    });

    return pet;
  }

  getPetsByTag(tag: string) {
    let pets = [{
      id: "",
      data: {
        name: "",
        age: 0,
        color: "",
        breed: "",
        stay: "",
        details: "",
        img: "",
        tag: [""]
      }
    }];

    this.http.get<Pet[]>(this.url + "pets?tag=" + tag).subscribe(resPets => {
      pets = resPets;
    });

    return pets;
  }
}
