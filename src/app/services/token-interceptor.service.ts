import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as alertify from 'alertifyjs';
@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  //crea una nueva cabecera con la que se agrega el token de authentication de esta forma se enviara
  //automaticamente el token
  //en el backend se recibe este token y automaticamente revisa el rol para ver si puede acceder
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
    return next.handle(tokenizeReq).pipe(
      catchError((error) => {
        // Manejar el error aquí y mostrarlo con AlertifyJS
        alertify.error(error.error.message);
        // También puedes registrar el error en la consola para fines de depuración
        //console.error(error);
        // Propaga el error para que el componente o servicio que realizó la solicitud también lo maneje
        return throwError(error);
      })
    );
  }
}
