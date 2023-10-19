import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrearUsuarioComponent } from './pages/crear-usuario/crear-usuario.component';

import { RecuperarContrasenaComponent } from './pages/recuperar-contrasena/recuperar-contrasena.component';

import { AuthGuard } from '../auth.guard';

import { LoginComponent } from '../public/pages/login/login.component';
import { InicioAdminComponent } from '../administrador/pages/inicio-admin/inicio-admin.component';

const routes: Routes = [
    //public
    {path: '',component:LoginComponent},
    {path: 'crearusuario', component:CrearUsuarioComponent},
    {path: 'recuperarcontrasena', component:RecuperarContrasenaComponent},
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
