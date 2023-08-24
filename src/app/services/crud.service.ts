import { Injectable } from '@angular/core';
import { Rol } from '../models/rol.model';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private RestApi: string='http://localhost:8090/api'
  httpHeaders= new HttpHeaders().set('content-type','application/json')

  constructor(private httpClient:HttpClient) { }

//-----------Roles-----------------------
  getRoles(){
    return this.httpClient.get(`${this.RestApi}/rol`, {headers:this.httpHeaders})
  }

  getRol(id:any){
    return this.httpClient.get(`${this.RestApi}/rol/${id}`,{headers: this.httpHeaders}).pipe(
      map((res:any)=>{
        return res || {}
      })
    )
  }
  
  crearRol(data:Rol){
    return this.httpClient.post(`${this.RestApi}/rol/crear`, data,{headers: this.httpHeaders})
    .pipe(catchError(this.handleError))
  }
  //diferente en el back
  modificarRol(data:any){
    return this.httpClient.put(`${this.RestApi}/rol/modificar`,data,{headers: this.httpHeaders})
    .pipe(catchError(this.handleError))
  }

  handleError(error:HttpErrorResponse){
    let errorMsg: string=''
    if(error.error instanceof ErrorEvent){
      errorMsg=error.error.message
    }else{
      errorMsg=`Error code: ${error.status}. Message: ${error.message}`
    }
    return throwError(()=>{
      errorMsg
    })
  }
//-----------Usuarios-----------------------
getUsuarios(){
  return this.httpClient.get(`${this.RestApi}/usuario`, {headers:this.httpHeaders})
}

getUsuario(id:any){
  return this.httpClient.get(`${this.RestApi}/usuario/${id}`,{headers: this.httpHeaders}).pipe(
    map((res:any)=>{
      return res || {}
    })
  )
}

crearUsuario(data:Usuario){
  return this.httpClient.post(`${this.RestApi}/usuario/crear`, data,{headers: this.httpHeaders})
  .pipe(catchError(this.handleError))
}

modificarUsuario(data:any){
  return this.httpClient.put(`${this.RestApi}/usuario/modificar`,data,{headers: this.httpHeaders})
  .pipe(catchError(this.handleError))
}


}
