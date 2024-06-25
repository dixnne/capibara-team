import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FactsService {

  constructor(private http: HttpClient) { };

  toReturn() {
    let headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.get("https://catfact.ninja/facts?max_length=200&limit=42", {
      headers: headers
    }).pipe(take(1));
  }
}
