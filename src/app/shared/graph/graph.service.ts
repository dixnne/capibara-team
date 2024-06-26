import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Report } from '../../interfaces/graph-report';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private http:HttpClient) { }

  getChartsData(date:string){
    return this.http.get<Report>('https://capibara.losnarvaez.com/graph/'+date);
  }
}
