import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CambiarContrasenaComponent } from './pages/cambiar-contrasena/cambiar-contrasena.component';
import { ModificarUsuarioComponent } from './pages/modificar-usuario/modificar-usuario.component';

import { AuthGuard } from '../auth.guard';
import { Layout2Component } from './components/layouts/layout2/layout2.component';

const routes: Routes = [
    //shared
    {path: 'cambiarcontrasena', component:CambiarContrasenaComponent},
    //{path: 'modificarusuario', component:ModificarUsuarioComponent, canActivate: [AuthGuard]},


    {
      path: '',
      component: Layout2Component, 
      children: [
        {path: 'modificarusuario', component:ModificarUsuarioComponent, canActivate: [AuthGuard]},
      ],
    },


  ];
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
