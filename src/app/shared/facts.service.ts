import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FactsService {

  constructor(private http: HttpClient) { };

  toReturn() {
    return this.http.get("https://catfact.ninja/facts?max_length=200&limit=42").pipe(take(1));
  }
}
