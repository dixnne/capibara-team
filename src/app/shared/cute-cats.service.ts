import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CuteCatsService {

  constructor(private http: HttpClient) { };

  toReturn() {
    let headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.get("https://cataas.com/api/cats?limit=20&tags=cute", {
      headers: headers
    }).pipe(take(1));
  }
}
