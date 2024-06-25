import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private http:HttpClient) { }

  getChartsData(date:string){
    return this.http.get('http://localhost:3000/prueba/'+date);
  }
}
