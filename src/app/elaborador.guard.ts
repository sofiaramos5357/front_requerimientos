import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { DatosUsuarioService } from 'src/app/services/datos-usuario.service';

@Injectable({
  providedIn: 'root'
})
export class  elaboradorGuard implements CanActivate{

  constructor(
    private datosUsuarioService: DatosUsuarioService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.datosUsuarioService.DatosUsuario().pipe(
      map(user => {
        //console.log(user[0].RolId)
        if (user && user[0].RolId === 2) {
          return true;
        } else {
          // Redirigir al usuario a una página no autorizada o realizar alguna otra acción
          this.router.navigate(['/home']);
          return false;
        }
      })
    );
  }

}
