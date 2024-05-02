import { Injectable } from '@angular/core';
import { Mascota } from './mascota';
import { Mascotas } from './misMascotas';

@Injectable({
  providedIn: 'root',
})
export class MascotaService {
  private mascotas: Mascota[] = Mascotas;

  constructor() {}

  getMascotas(): Mascota[] {
    return this.mascotas;
  }

  getUnaMascota(posicion: number): Mascota {
    return this.mascotas[posicion];
  }
}
