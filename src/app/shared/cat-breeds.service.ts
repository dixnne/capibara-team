import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatBreedsService {

  constructor(private http: HttpClient) { }

  returnBreedsList() {
    let headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.get("https://api.thecatapi.com/v1/breeds?api_key=live_gQk7oT2JpFwFPH7HhUspzynJsWXUNySeaTEvEVmUxGB9ryJxFg62MAxj8jaJnMbF", {
      headers: headers
    });
  }
}

