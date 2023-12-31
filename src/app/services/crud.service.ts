import { Injectable } from '@angular/core';
import { Rol } from '../models/rol.model';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { RequerimientoEstado } from '../models/requerimiento-estado.model';
import { Sistema } from '../models/sistema.model';
import { RequerimientoDetalle } from '../models/requerimiento-detalle.model';
import { TipoCambio } from '../models/tipo-cambio.model';
import { TipoObjeto } from '../models/tipo-objeto.model';
import { CrearRequerimiento } from '../models/crear-requerimiento.model';
import { RequerimientoCreado } from '../models/requerimiento-creado';
import { FichaTecnica } from '../models/ficha-tecnica.model';
import { DatosFichaTecnica } from '../models/datos-ficha-tecnica.model';
import { Revision } from '../models/revision';
import { Changelog } from '../models/changelog.model';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  //al momento de subir el servidor poner la direccion ip de donde estara alojado el backend
  private RestApi: string = 'http://192.168.41.68:1054/api';
  httpHeaders = new HttpHeaders().set('content-type', 'application/json');

  //urls para iniciar el backend, se usan 2 puertos porque en iis se utilizaron 2 puertos para el backend
  private RestApiInicio: string = 'http://192.168.41.68:1054';
  private RestApiInicio2: string = 'http://192.168.41.68:8090';


  constructor(private httpClient: HttpClient) {}

  //-------------manejo de errores----
  handleError(error: HttpErrorResponse) {
    let errorMsg: string = '';
    if (error.error instanceof ErrorEvent) {
      errorMsg = error.error.message;
    } else {
      errorMsg = `Error code: ${error.status}. Message: ${error.message}`;
    }
    return throwError(() => {
      errorMsg;
    });
  }
  //----------------------------------------------------------------

  //-------------Servicio para levantar el backen juntamente con angular--------
 // Servicio para llamar a la ruta '/' del backend ya que llamando al backend se levanta juntamente con angular
 getApiStatus(): Observable<any> {
  return this.httpClient.get(`${this.RestApiInicio}`);
}
getApiStatus2(): Observable<any> {
  return this.httpClient.get(`${this.RestApiInicio2}`);
}
//----------------------------------------------------------------------------

//servicio para descargar los manuales-------------------
descargaManuales(filePath: string): Observable<Blob> {
  return this.httpClient.get(`${filePath}`, { responseType: 'blob' });
}
//-------------------------------

  //-----------Roles-----------------------
  getRoles() {
    return this.httpClient
      .get(`${this.RestApi}/rol`, { headers: this.httpHeaders })
      .pipe(
        map((res: Rol) => {
          return res || {};
        })
      );
  }

  getRol(id: any) {
    return this.httpClient
      .get(`${this.RestApi}/rol/${id}`, { headers: this.httpHeaders })
      .pipe(
        map((res: any) => {
          return res || {};
        })
      );
  }

  //-----------Usuarios-----------------------
  getUsuarios() {
    return this.httpClient
      .get(`${this.RestApi}/usuario`, { headers: this.httpHeaders })
      .pipe(
        map((res: Usuario) => {
          return res || {};
        })
      );
  }

  getUsuario(id: any) {
    return this.httpClient
      .get(`${this.RestApi}/usuario/${id}`, { headers: this.httpHeaders })
      .pipe(
        map((res: any) => {
          return res || {};
        })
      );
  }

  crearUsuario(data: any) {
    return this.httpClient
      .post(`${this.RestApi}/registro`, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response)
      );
  }

  modificarUsuario(data: any) {
    return this.httpClient
      .post(`${this.RestApi}/usuario/guardarcambios`, data, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response)
      );
  }

  modificarUsuarioPropio(data: any) {
    return this.httpClient
      .post(`${this.RestApi}/usuario/modificar`, data, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response)
      );
  }

  //---------------------cambiar contrasena----------------

  nuevaContrasena(data: any) {
    return this.httpClient
      .post(`${this.RestApi}/cambiocontrasena`, data, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response)
      );
  }

  //---------------------documentos-----------------------------------------------------------------

  getDocumento(id: any) {
    return this.httpClient
      .get(`${this.RestApi}/documento/${id}`, { headers: this.httpHeaders })
      .pipe(
        map((res: any) => {
          return res || {};
        })
      );
  }

  sendPost(body: FormData) {
    return this.httpClient.post(`${this.RestApi}/guardardocumento`, body).pipe(
      catchError(this.handleError),
      map((response: any) => response)
    );
  }

  getDocumentosEdicion(Id: any) {
    return this.httpClient
      .get(`${this.RestApi}/documentoedicion/${Id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((res: any) => {
          return res || {};
        })
      );
  }

  eliminarDocumento(Id: any) {
    return this.httpClient
      .post(`${this.RestApi}/eliminardocumento/${Id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response)
      );
  }

  descargarExcel(data: any) {
    // Realiza una solicitud POST con los datos en el cuerpo
    return this.httpClient
      .post(`${this.RestApi}/requerimientoreporte`, data, {
        headers: this.httpHeaders,
        responseType: 'blob', // Para indicar que esperamos una respuesta binaria (el archivo Excel)
      })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response)
      );
  }

  existenRegistros(fechaCreacion: any) {
    return this.httpClient
      .post(`${this.RestApi}/existenRegistros/`, fechaCreacion, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response)
      );
  }

  //---------------------Requerimiento-----------------------------------------------------------------
  getRequerimientoscreadas() {
    return this.httpClient
      .get(`${this.RestApi}/creados`, { headers: this.httpHeaders })
      .pipe(
        map((res: RequerimientoCreado) => {
          return res || {};
        })
      );
  }

  getRequerimientosAsignados(Id: any) {
    return this.httpClient
      .get(`${this.RestApi}/requerimientocambio/${Id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((res: RequerimientoCreado) => {
          return res || {};
        })
      );
  }

  crearRequerimiento(data: CrearRequerimiento) {
    return this.httpClient
      .post(`${this.RestApi}/requerimientocambio/crear`, data, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response)
      );
  }

  modificarRequerimiento(data: any) {
    return this.httpClient
      .post(
        `${this.RestApi}/requerimientocambio/modificarinformacioninicial`,
        data,
        { headers: this.httpHeaders }
      )
      .pipe(
        catchError(this.handleError),
        map((response: any) => response)
      );
  }

  eliminarRequerimiento(data: any) {
    return this.httpClient
      .post(`${this.RestApi}/requerimientocambio/eliminar`, data, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response)
      );
  }

  registrarFichaTecnica(data: FichaTecnica) {
    return this.httpClient
      .post(`${this.RestApi}/requerimientocambio/datosprevios`, data, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response)
      );
  }

  getRequerimientosProceso(Id: any) {
    return this.httpClient
      .get(`${this.RestApi}/requerimientoproceso/${Id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((res: RequerimientoCreado) => {
          return res || {};
        })
      );
  }
  getFichaTecnica(Id: any) {
    return this.httpClient
      .get(`${this.RestApi}/datosfichatecnica/${Id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((res: DatosFichaTecnica) => {
          return res || {};
        })
      );
  }

  eliminarFichaTecnica(Id: any) {
    return this.httpClient
      .post(`${this.RestApi}/fichatecnica/eliminar/${Id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response)
      );
  }

  pendienteRevisar(Id: any) {
    return this.httpClient
      .post(`${this.RestApi}/requerimientocambio/pendienterevisar/${Id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response)
      );
  }

  getPendienteRevisar(Id: number) {
    return this.httpClient
      .get(`${this.RestApi}/reqpendienterevision/${Id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((res: RequerimientoCreado) => {
          return res || {};
        })
      );
  }

  estadoIniciado(Id: any) {
    return this.httpClient
      .post(`${this.RestApi}/estadoiniciado/${Id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response)
      );
  }

  getRequerimientosARevisar(Id: any) {
    return this.httpClient
      .get(`${this.RestApi}/requerimientoarevisar/${Id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((res: RequerimientoCreado) => {
          return res || {};
        })
      );
  }

  getRequerimientosADocumentar(Id: any) {
    return this.httpClient
      .get(`${this.RestApi}/requerimientosdocumentar/${Id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((res: RequerimientoCreado) => {
          return res || {};
        })
      );
  }

  revisionAprobada(data: Revision) {
    return this.httpClient
      .post(`${this.RestApi}/requerimientocambio/revisionaprobada`, data, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response)
      );
  }

  revisionDenegada(data: Revision) {
    return this.httpClient
      .post(`${this.RestApi}/requerimientocambio/revisionadenegada`, data, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response)
      );
  }
  //--------------------------------------------cantidades de requerimientos  administrador(proceso, revisar,documentar) elaborador(asignados, proceso, revision)------------------------
  TotalRequerimientoscreadas() {
    return this.httpClient
      .get(`${this.RestApi}/totalcreados`, { headers: this.httpHeaders })
      .pipe(
        map((res: any) => {
          return res || {};
        })
      );
  }
  TotalRequerimientosARevisar(Id: any) {
    return this.httpClient
      .get(`${this.RestApi}/totalrequerimientoarevisar/${Id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((res: any) => {
          return res || {};
        })
      );
  }
  TotalRequerimientosADocumentar(Id: any) {
    return this.httpClient
      .get(`${this.RestApi}/totalrequerimientosdocumentar/${Id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((res: any) => {
          return res || {};
        })
      );
  }
  TotalRequerimientosAsignados(Id: any) {
    return this.httpClient
      .get(`${this.RestApi}/totalrequerimientocambio/${Id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((res: any) => {
          return res || {};
        })
      );
  }
  TotalPendienteRevisar(Id: number) {
    return this.httpClient
      .get(`${this.RestApi}/totalreqpendienterevision/${Id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((res: any) => {
          return res || {};
        })
      );
  }
  TotalRequerimientosProceso(Id: any) {
    return this.httpClient
      .get(`${this.RestApi}/totalrequerimientoproceso/${Id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((res: any) => {
          return res || {};
        })
      );
  }
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  //---------------------RequerimientoEstado-----------------------------------------------------------------
  getRequerimientosEstados() {
    return this.httpClient
      .get(`${this.RestApi}/requerimientoestado`, { headers: this.httpHeaders })
      .pipe(
        map((res: RequerimientoEstado) => {
          return res || {};
        })
      );
  }

  getRequerimientoEstado(id: any) {
    return this.httpClient
      .get(`${this.RestApi}/requerimientoestado/${id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((res: RequerimientoEstado) => {
          return res || {};
        })
      );
  }

  //---------------------Sistema-----------------------------------------------------------------
  getSistemas() {
    return this.httpClient
      .get(`${this.RestApi}/sistema`, { headers: this.httpHeaders })
      .pipe(
        map((res: Sistema) => {
          return res || {};
        })
      );
  }
  getSistemaActivos() {
    return this.httpClient
      .get(`${this.RestApi}/sistemaactivo`, { headers: this.httpHeaders })
      .pipe(
        map((res: Sistema) => {
          return res || {};
        })
      );
  }
  getSistema(id: any) {
    return this.httpClient
      .get(`${this.RestApi}/sistema/${id}`, { headers: this.httpHeaders })
      .pipe(
        map((res: Sistema) => {
          return res || {};
        })
      );
  }
  crearSistema(data: Sistema) {
    return this.httpClient
      .post(`${this.RestApi}/sistema/crear`, data, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response)
      );
  }
  modificarSistema(data: Sistema) {
    return this.httpClient
      .post(`${this.RestApi}/sistema/modificar`, data, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response)
      );
  }

  eliminarSistema(Id: any) {
    return this.httpClient
      .post(`${this.RestApi}/eliminarsistema/${Id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response)
      );
  }

  activarSistema(Id: any) {
    return this.httpClient
      .post(`${this.RestApi}/activarsistema/${Id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response)
      );
  }
  //---------------------RequerimientoDetalle-----------------------------------------------------------------

  getRequerimientoDetalle(id: any) {
    return this.httpClient
      .get(`${this.RestApi}/requerimientocambiodetalle/${id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((res: RequerimientoDetalle) => {
          return res || {};
        })
      );
  }

  crearRequerimientoDetalle(data: RequerimientoDetalle) {
    return this.httpClient
      .post(`${this.RestApi}/requerimientocambiodetalle/crear`, data, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response)
      );
  }

  modificarRequerimientoDetalle(data: any) {
    return this.httpClient
      .post(`${this.RestApi}/requerimientocambiodetalle/modificar`, data, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response)
      );
  }

  eliminarRequerimientoDetalle(id: any) {
    return this.httpClient
      .delete(`${this.RestApi}/eliminar/${id}`, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response)
      );
  }

  //---------------------TipoCambio-----------------------------------------------------------------
  getTipoCambioActivos() {
    return this.httpClient
      .get(`${this.RestApi}/tipocambioactivo`, { headers: this.httpHeaders })
      .pipe(
        map((res: TipoCambio) => {
          return res || {};
        })
      );
  }

  getTipoCambio(id: any) {
    return this.httpClient
      .get(`${this.RestApi}/tipocambio/${id}`, { headers: this.httpHeaders })
      .pipe(
        map((res: TipoCambio) => {
          return res || {};
        })
      );
  }

  getTipoCambios() {
    return this.httpClient
      .get(`${this.RestApi}/tipocambio`, { headers: this.httpHeaders })
      .pipe(
        map((res: TipoCambio) => {
          return res || {};
        })
      );
  }

  crearTipoCambio(data: TipoCambio) {
    return this.httpClient
      .post(`${this.RestApi}/tipocambio/crear`, data, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response)
      );
  }

  modificarTipoCambio(data: TipoCambio) {
    return this.httpClient
      .post(`${this.RestApi}/tipocambio/modificar`, data, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response)
      );
  }

  eliminarTipoCambio(Id: any) {
    return this.httpClient
      .post(`${this.RestApi}/eliminartipocambio/${Id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response)
      );
  }

  activarTipoCambio(Id: any) {
    return this.httpClient
      .post(`${this.RestApi}/activartipocambio/${Id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response)
      );
  }
  //---------------------TipoObjeto-----------------------------------------------------------------
  getTipoObjetos() {
    return this.httpClient
      .get(`${this.RestApi}/tipoobjeto`, { headers: this.httpHeaders })
      .pipe(
        map((res: TipoObjeto) => {
          return res || {};
        })
      );
  }

  getTipoObjetosActivos() {
    return this.httpClient
      .get(`${this.RestApi}/tipoobjetoactivo`, { headers: this.httpHeaders })
      .pipe(
        map((res: TipoObjeto) => {
          return res || {};
        })
      );
  }

  getTipoObjeto(id: any) {
    return this.httpClient
      .get(`${this.RestApi}/tipoobjeto/${id}`, { headers: this.httpHeaders })
      .pipe(
        map((res: TipoObjeto) => {
          return res || {};
        })
      );
  }

  crearTipoObjeto(data: TipoObjeto) {
    return this.httpClient
      .post(`${this.RestApi}/tipoobjeto/crear`, data, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response)
      );
  }

  modificarTipoObjeto(data: TipoObjeto) {
    return this.httpClient
      .post(`${this.RestApi}/tipoobjeto/modificar`, data, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response)
      );
  }

  eliminarTipoObjeto(Id: any) {
    return this.httpClient
      .post(`${this.RestApi}/eliminartipoobjeto/${Id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response)
      );
  }

  activarTipoObjeto(Id: any) {
    return this.httpClient
      .post(`${this.RestApi}/activartipoobjeto/${Id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError(this.handleError),
        map((response: any) => response)
      );
  }

  //---------------------changelog-----------------------------------------------------------------
  getChangelog(id: any) {
    return this.httpClient
      .get(`${this.RestApi}/changelog/${id}`, { headers: this.httpHeaders })
      .pipe(
        map((res: Changelog) => {
          return res || {};
        })
      );
  }
}
