import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL ='http://localhost:8090/api'

  constructor(private http: HttpClient) { }

  signUp(usuario){
    return this.http.post<any>(this.URL + `/login`, usuario);
  }
}
