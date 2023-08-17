import { Injectable } from '@angular/core';
import { Rol } from '../models/rol.model';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private RestApi: string='http://localhost:8090/api/rol'
  httpHeaders= new HttpHeaders().set('content-type','application/json')

  constructor(private httpClient:HttpClient) { }

  getRoles(){
    return this.httpClient.get(this.RestApi, {headers:this.httpHeaders})
  }

  getRol(id:any){
    return this.httpClient.get(`this.RestApi/${id}`,{headers: this.httpHeaders}).pipe(
      map((res:any)=>{
        return res || {}
      })
    )
  }
  crearRol(data:Rol){
    return this.httpClient.post(this.RestApi, data,{headers: this.httpHeaders})
    .pipe(catchError(this.handleError))
  }
  modificarRol(id:any, data:any){
    return this.httpClient.put(`this.RestApi/${id}`,data,{headers: this.httpHeaders})
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
  

}
