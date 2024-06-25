import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = 'https://capibara.losnarvaez.com/';

  constructor(public http: HttpClient) {}

  addUser(newUser: User, file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('user', JSON.stringify(newUser.data));
    let headers = new HttpHeaders();
    headers = headers.append('enctype', 'multipart/form-data');
    console.log(formData);
    return this.http.post<any>(this.url + 'users', formData, {
      headers: headers,
    });
  }

  deleteUser(id: string) {
    return this.http.delete<any>(this.url + 'users/' + id);
  }
  getUsers() {
    return this.http.get<User[]>(this.url + 'users');
  }
  getUser(id: string) {
    return this.http.get<User>(this.url + 'users/' + id);
  }

  getUserByEmail(email: string) {
    return this.http.get<User[]>(this.url + 'users/email/' + email);
  }

  getUserByName(name: string) {
    return this.http.get<User>(this.url + 'users?name=' + name);
  }
}
