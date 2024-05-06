import { Injectable } from '@angular/core';
import { Pet } from '../interfaces/pet';
import { Pets } from '../data/pets';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  private pets: Pet[] = Pets;

  constructor() {}

  getPets(): Pet[] {
    return this.pets;
  }

  getAPet(index: number): Pet {
    return this.pets[index];
  }

  getPetIndex(name: string): number {
    let index = this.pets.findIndex(pet => pet.name === name);
    return index;
  }

  getPetsByTag(tags: string): Pet[] {
    return this.pets.filter((pet) => {
      if (
        pet.tag.find((t) => {
          return t === tags;
        })
      ) {
        return true;
      } else {
        return false;
      }
    });
  }
}
