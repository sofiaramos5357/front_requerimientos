import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CambiarContrasenaComponent } from './pages/cambiar-contrasena/cambiar-contrasena.component';
import { ModificarUsuarioComponent } from './pages/modificar-usuario/modificar-usuario.component';

import { AuthGuard } from '../auth.guard';
import { Layout2Component } from './components/layouts/layout2/layout2.component';
import { Layout4Component } from './components/layouts/layout4/layout4.component';

const routes: Routes = [
    //shared

    {
      path: '',
      component: Layout4Component, 
      children: [
        {path: 'cambiarcontrasena', component:CambiarContrasenaComponent},
      ],
    },

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
