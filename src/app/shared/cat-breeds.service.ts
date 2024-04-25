import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatBreedsService {

  constructor(private http: HttpClient) { }

  returnBreedsList() {
    return this.http.get("https://api.thecatapi.com/v1/breeds");
  }

  returnABreed(breedId: string) {
    return this.http.get("https://api.thecatapi.com/v1/images/search?breed_ids=" + breedId);
  }
}

