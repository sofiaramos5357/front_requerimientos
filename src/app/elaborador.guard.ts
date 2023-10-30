// Importar los módulos y servicios necesarios desde Angular y otras fuentes
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root', // Define que este servicio estará disponible en toda la aplicación
})
export class elaboradorGuard implements CanActivate {
  constructor(
    private datosUsuarioService: DatosUsuarioService, // Inyectar el servicio DatosUsuarioService
    private router: Router, // Inyectar el servicio de enrutamiento
    private authService: AuthService // Inyectar el servicio AuthService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot, // La ruta que el usuario intenta acceder
    state: RouterStateSnapshot // El estado actual del enrutador
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.datosUsuarioService.DatosUsuario().pipe( // Llamar a un servicio para obtener datos de usuario
      map((user) => { // Utilizar el operador map para procesar los datos del usuario
        if (user && user[0].RolId === 2 && user[0].Activo === true) {
          // Si el usuario existe y tiene un RolId de 2 y está activo
          return true; // Permite que el usuario acceda a la ruta
        } else {
          // Si no cumple con las condiciones anteriores
          // Redirigir al usuario a la página de inicio de sesión y cerrar la sesión
          this.authService.logout();
          this.router.navigate(['/login']);
          return false; // No permite el acceso a la ruta
        }
      })
    );
  }
}
