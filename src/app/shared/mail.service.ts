import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MailFormat } from '../interfaces/mail';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  url: string = "https://capibara.losnarvaez.com/mail/";

  constructor(public http: HttpClient) { }

  sendContactMail(body: MailFormat) {
    const headers = { 'content-type': 'application/json' }  
    return this.http.post<any>(this.url + "contact", body, { 
      "headers": headers 
    });
  }

  sendDateMail(body: MailFormat) {
    const headers = { 'content-type': 'application/json' }  
    return this.http.post<any>(this.url + "date", body, { 
      "headers": headers 
    });
  }
}
