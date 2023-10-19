import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FichaTecnicaComponent } from './pages/ficha-tecnica/ficha-tecnica.component';
import { RequerimientoAsignadoComponent } from './pages/requerimiento-asignado/requerimiento-asignado.component';
import { ModificarFichaComponent } from './pages/modificar-ficha/modificar-ficha.component';

import { ObjetoComponent } from './pages/objeto/objeto.component';

import { InicioElaboradorComponent } from './pages/inicio-elaborador/inicio-elaborador.component';
import { RequerimientoCambioComponent } from './pages/requerimiento-cambio/requerimiento-cambio.component';

import { AuthGuard } from '../auth.guard';
import { elaboradorGuard } from '../elaborador.guard';
import { Layout1Component } from '../shared/components/layouts/layout1/layout1.component';
import { Layout2Component } from '../shared/components/layouts/layout2/layout2.component';

const routes: Routes = [

  {
    path: 'home',
    component: Layout1Component, 
    children: [
      {path: 'elaborador', component:InicioElaboradorComponent, canActivate: [AuthGuard, elaboradorGuard]},
    ],
  },
  {
    path: '',
    component: Layout2Component, 
    children: [
      {path: 'fichatecnica', component:FichaTecnicaComponent, canActivate: [AuthGuard, elaboradorGuard]},
      {path: 'requerimientoasignado', component:RequerimientoAsignadoComponent, canActivate: [AuthGuard, elaboradorGuard]},
      {path: 'modificarficha', component:ModificarFichaComponent, canActivate: [AuthGuard, elaboradorGuard]},
      {path: 'reqdetalle', component:RequerimientoCambioComponent, canActivate: [AuthGuard, elaboradorGuard]},
      {path: 'objetos', component:ObjetoComponent, canActivate: [AuthGuard, elaboradorGuard]},
    
    ],
  },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElaboradorRoutingModule { }
