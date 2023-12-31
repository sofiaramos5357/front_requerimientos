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
  providedIn: 'root',
})
export class adminGuard implements CanActivate {
  constructor(
    private datosUsuarioService: DatosUsuarioService,
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.datosUsuarioService.DatosUsuario().pipe(
      map((user) => {
        if (user && user[0].RolId === 1 && user[0].Activo === true) {
          // Si hay un usuario, su rol es 1 (administrador) y está activo, permite el acceso
          return true;
        } else {
          // Si no cumple con los criterios, redirige al usuario a la página de inicio de sesión y bloquea el acceso
          this.authService.logout();
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
