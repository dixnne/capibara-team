import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DogBreedsService {

  constructor(private http: HttpClient) { }

  returnBreedsList() {
    let headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.get("https://api.thedogapi.com/v1/breeds?api_key=live_6zhodkK2cmP4rbnwuJCudkRu5McRFVFiyLocLwVj96GSqepeobAXcw31ut2758q6", {
      headers: headers
    });
  }
}
