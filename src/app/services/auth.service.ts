import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Usuario } from '../models/usuario.model';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL ='http://localhost:8090/api'

  constructor(private http: HttpClient, private router:Router) { }

  signUp(usuario){
    return this.http.post<any>(this.URL + `/login`, usuario);
  }

  //para saber si el token existe o fue modificado
  loggedIn(){
    //si existe devolvera un true si no un false
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  //para cerrar sesion
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }


  //-------------------------enviar contrasena------------------------
enviarContrasena(usuario){
  return this.http.post<any>(this.URL + `/recuperarcontrasena`, usuario);
}

//----obtener los datos del usuario apartir del token
getUserData(): Observable<Usuario> {
  const token = this.getToken();
  if (token) {
    // Decodificar el token y extraer los datos del usuario.
    const tokenData = JSON.parse(atob(token.split('.')[1])); // Decodificar el payload del token
    // Aquí asumimos que los datos del usuario se encuentran en el token con el nombre "userData".    
    return of(tokenData as Usuario);
  } else {
    return throwError('Token no encontrado');
  }
}



}

