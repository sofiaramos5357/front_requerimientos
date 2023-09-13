import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosUsuarioService {

  private URL ='http://localhost:8090/api'

  constructor(private http: HttpClient) { }

  DatosUsuario(): Observable<any> {
    return this.http.post<any>(`${this.URL}/datosusuario`, {});
  }

}
