import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrearUsuarioComponent } from './pages/crear-usuario/crear-usuario.component';

import { RecuperarContrasenaComponent } from './pages/recuperar-contrasena/recuperar-contrasena.component';

import { AuthGuard } from '../auth.guard';

import { LoginComponent } from '../public/pages/login/login.component';
import { InicioAdminComponent } from '../administrador/pages/inicio-admin/inicio-admin.component';
import { Layout3Component } from '../shared/components/layouts/layout3/layout3.component';
import { Layout4Component } from '../shared/components/layouts/layout4/layout4.component';

const routes: Routes = [
  

    {
      path: '',
      component: Layout4Component, 
      children: [
        {path: '', component:LoginComponent},
      ],
    },

    {
      path: '',
      component: Layout3Component, 
      children: [
        {path: 'crearusuario', component:CrearUsuarioComponent},
        {path: 'recuperarcontrasena', component:RecuperarContrasenaComponent},
      ],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
