import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import jwt_decode from 'jwt-decode';

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

  getRoleId(): number | null {
    const token = this.getToken();
    
    if (token) {
      const decodedToken: { RolId: number } = jwt_decode(token); // Aseguramos el tipo de 'decodedToken'
      
      //console.log(decodedToken.RolId);
      
      return decodedToken.RolId;
    }
    
    return null; // Si no hay token, devuelve un valor nulo
  }
  
  

  //-------------------------enviar contrasena------------------------
enviarContrasena(usuario){
  return this.http.post<any>(this.URL + `/recuperarcontrasena`, usuario);
}

}

