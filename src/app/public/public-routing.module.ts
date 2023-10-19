import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrearUsuarioComponent } from './pages/crear-usuario/crear-usuario.component';

import { RecuperarContrasenaComponent } from './pages/recuperar-contrasena/recuperar-contrasena.component';

import { AuthGuard } from '../auth.guard';

import { LoginComponent } from '../public/pages/login/login.component';

const routes: Routes = [
    //public
    {path: '',component:LoginComponent},
    {path: 'crearusuario', component:CrearUsuarioComponent},
    {path: 'recuperarcontrasena', component:RecuperarContrasenaComponent},

    {
      path: 'homeadmin',
      loadChildren: () =>
        import('../administrador/administrador.module').then((a) => a.AdministradorModule),
    },
    {
      path: 'homeelaborador',
      loadChildren: () =>
        import('../elaborador/elaborador.module').then((e) => e.ElaboradorModule),
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
