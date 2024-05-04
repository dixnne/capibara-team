import { Injectable } from '@angular/core';
import { Dev } from '../interfaces/dev';
import { Devs } from '../data/devs';

@Injectable({
  providedIn: 'root'
})
export class DevsService {

  private devs: Dev[] = Devs;

  constructor() {}

  getDevs(): Dev[] {
    return this.devs;
  }

  getADev(index: number): Dev {
    return this.devs[index];
  }
}
