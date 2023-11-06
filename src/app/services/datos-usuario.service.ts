import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatosUsuarioService {
  //al momento de subir el servidor poner la direccion ip de donde estara alojado el backend
  private URL = 'http://172.16.242.78:1054/api';

  constructor(private http: HttpClient) {}

  DatosUsuario(): Observable<any> {
    return this.http.post<any>(`${this.URL}/datosusuario`, {});
  }
}
