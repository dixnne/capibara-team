import { Injectable } from '@angular/core';
import { Pet } from '../interfaces/pet';
import { Pets } from '../data/pets';

@Injectable({
  providedIn: 'root'
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
}
