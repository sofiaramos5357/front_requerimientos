import { Injectable } from '@angular/core';
import { Rol } from '../models/rol.model';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Documento } from '../models/documento.model';
import { Requerimiento } from '../models/requerimiento.model';
import { RequerimientoEstado } from '../models/requerimiento-estado.model'; 
import { Sistema } from '../models/sistema.model';
import { RequerimientoDetalle } from '../models/requerimiento-detalle.model';
import { TipoCambio } from '../models/tipo-cambio.model';
import { TipoObjeto } from '../models/tipo-objeto.model';
import { CrearRequerimiento } from '../models/crear-requerimiento.model';
import { RequerimientoCreado } from '../models/requerimiento-creado';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private RestApi: string='http://localhost:8090/api'
  httpHeaders= new HttpHeaders().set('content-type','application/json')

  constructor(private httpClient:HttpClient) { }

//-----------Roles-----------------------
  getRoles(){
    return this.httpClient.get(`${this.RestApi}/rol`, {headers:this.httpHeaders}).pipe(
      map((res:Rol)=>{
        return res || {}
      })
    )
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
  return this.httpClient.get(`${this.RestApi}/usuario`, {headers:this.httpHeaders}).pipe(
    map((res:Usuario)=>{
      return res || {}
    })
  )
}

getUsuario(id:any){
  return this.httpClient.get(`${this.RestApi}/usuario/${id}`,{headers: this.httpHeaders}).pipe(
    map((res:any)=>{
      return res || {}
    })
  )
}

crearUsuario(data:any){
  return this.httpClient.post(`${this.RestApi}/registro`, data,{headers: this.httpHeaders})
  .pipe(catchError(this.handleError),map((response: any) => response));
}

modificarUsuario(data:any){
  return this.httpClient.post(`${this.RestApi}/usuario/guardarcambios`,data,{headers: this.httpHeaders})
  .pipe(catchError(this.handleError),map((response: any) => response))
}


//---------------------documentos-----------------------------------------------------------------
getDocumentos(){
  return this.httpClient.get(`${this.RestApi}/documento`, {headers:this.httpHeaders})
}

getDocumento(id:any){
  return this.httpClient.get(`${this.RestApi}/documento/${id}`,{headers: this.httpHeaders}).pipe(
    map((res:any)=>{
      return res || {}
    })
  )
}

crearDocumento(data:Documento){
  return this.httpClient.post(`${this.RestApi}/documento/crear`, data,{headers: this.httpHeaders})
  .pipe(catchError(this.handleError))
}

modificarDocumento(data:any){
  return this.httpClient.put(`${this.RestApi}/documento/modificar`,data,{headers: this.httpHeaders})
  .pipe(catchError(this.handleError))
}
//---------------------Requerimiento-----------------------------------------------------------------
getRequerimientoscreadas(){
  return this.httpClient.get(`${this.RestApi}/creados`, {headers:this.httpHeaders}).pipe(
    map((res:RequerimientoCreado)=>{
      return res || {}
    })
  )
}

getRequerimientosAsignados(Id:any){
  return this.httpClient.get(`${this.RestApi}/requerimientocambio/${Id}`,{headers: this.httpHeaders}).pipe(
    map((res:RequerimientoCreado)=>{
      return res || {}
    })
  )
}

crearRequerimiento(data:CrearRequerimiento){
  return this.httpClient.post(`${this.RestApi}/requerimientocambio/crear`, data,{headers: this.httpHeaders})
  .pipe(catchError(this.handleError),map((response: any) => response));
}

modificarRequerimiento(data:any){
  return this.httpClient.post(`${this.RestApi}/requerimientocambio/modificarinformacioninicial`,data,{headers: this.httpHeaders})
  .pipe(catchError(this.handleError),map((response: any) => response));
}

eliminarRequerimiento(data:any){
  return this.httpClient.post(`${this.RestApi}/requerimientocambio/eliminar`,data,{headers: this.httpHeaders})
  .pipe(catchError(this.handleError),map((response: any) => response));
}



//---------------------RequerimientoEstado-----------------------------------------------------------------
getRequerimientosEstados(){
  return this.httpClient.get(`${this.RestApi}/requerimientoestado`, {headers:this.httpHeaders}).pipe(
    map((res:RequerimientoEstado)=>{
      return res || {}
    })
  )
}

getRequerimientoEstado(id:any){
  return this.httpClient.get(`${this.RestApi}/requerimientoestado/${id}`,{headers: this.httpHeaders}).pipe(
    map((res:RequerimientoEstado)=>{
      return res || {}
    })
  )
}

crearRequerimientoEstado(data:RequerimientoEstado){
  return this.httpClient.post(`${this.RestApi}/requerimientoestado/crear`, data,{headers: this.httpHeaders})
  .pipe(catchError(this.handleError))
}

modificarRequerimientoEstado(data:any){
  return this.httpClient.put(`${this.RestApi}/requerimientoestado/modificar`,data,{headers: this.httpHeaders})
  .pipe(catchError(this.handleError))
}
//---------------------Sistema-----------------------------------------------------------------
getSistemas(){
  return this.httpClient.get(`${this.RestApi}/sistema`, {headers:this.httpHeaders})
  .pipe(
    map((res:Sistema)=>{
      return res || {}
    })
  )
}


getSistema(id:any){
  return this.httpClient.get(`${this.RestApi}/sistema/${id}`,{headers: this.httpHeaders}).pipe(
    map((res:any)=>{
      return res || {}
    })
  )
}

crearSistema(data:Sistema){
  return this.httpClient.post(`${this.RestApi}/sistema/crear`, data,{headers: this.httpHeaders})
  .pipe(catchError(this.handleError))
}

modificarSistema(data:any){
  return this.httpClient.put(`${this.RestApi}/sistema/modificar`,data,{headers: this.httpHeaders})
  .pipe(catchError(this.handleError))
}
//---------------------RequerimientoDetalle-----------------------------------------------------------------
getRequerimientosDetalles(){
  return this.httpClient.get(`${this.RestApi}/requerimientocambiodetalle`, {headers:this.httpHeaders})
}

getRequerimientoDetalle(id:any){
  return this.httpClient.get(`${this.RestApi}/requerimientocambiodetalle/${id}`,{headers: this.httpHeaders}).pipe(
    map((res:any)=>{
      return res || {}
    })
  )
}

crearRequerimientoDetalle(data:RequerimientoDetalle){
  return this.httpClient.post(`${this.RestApi}/requerimientocambiodetalle/crear`, data,{headers: this.httpHeaders})
  .pipe(catchError(this.handleError))
}

modificarRequerimientoDetalle(data:any){
  return this.httpClient.put(`${this.RestApi}/requerimientocambiodetalle/modificar`,data,{headers: this.httpHeaders})
  .pipe(catchError(this.handleError))
}
//---------------------TipoCambio-----------------------------------------------------------------
getTipoCambios(){
  return this.httpClient.get(`${this.RestApi}/tipocambio`, {headers:this.httpHeaders})
}

getTipoCambio(id:any){
  return this.httpClient.get(`${this.RestApi}/tipocambio/${id}`,{headers: this.httpHeaders}).pipe(
    map((res:any)=>{
      return res || {}
    })
  )
}

crearTipoCambio(data:TipoCambio){
  return this.httpClient.post(`${this.RestApi}/tipocambio/crear`, data,{headers: this.httpHeaders})
  .pipe(catchError(this.handleError))
}

modificarTipoCambio(data:any){
  return this.httpClient.put(`${this.RestApi}/tipocambio/modificar`,data,{headers: this.httpHeaders})
  .pipe(catchError(this.handleError))
}
//---------------------TipoObjeto-----------------------------------------------------------------
getTipoObjetos(){
  return this.httpClient.get(`${this.RestApi}/tipoobjeto`, {headers:this.httpHeaders})
}

getTipoObjeto(id:any){
  return this.httpClient.get(`${this.RestApi}/tipoobjeto/${id}`,{headers: this.httpHeaders}).pipe(
    map((res:any)=>{
      return res || {}
    })
  )
}

crearTipoObjeto(data:TipoObjeto){
  return this.httpClient.post(`${this.RestApi}/tipoobjeto/crear`, data,{headers: this.httpHeaders})
  .pipe(catchError(this.handleError))
}

modificarTipoObjeto(data:any){
  return this.httpClient.put(`${this.RestApi}/tipoobjeto/modificar`,data,{headers: this.httpHeaders})
  .pipe(catchError(this.handleError))
}



}