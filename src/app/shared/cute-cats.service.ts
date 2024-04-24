import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CuteCatsService {

  constructor(private http: HttpClient) { };

  toReturn() {
    return this.http.get("https://cataas.com/api/cats?tags=cute").pipe(take(1));
  }
}
