import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FichaTecnicaComponent } from './pages/ficha-tecnica/ficha-tecnica.component';
import { RequerimientoAsignadoComponent } from './pages/requerimiento-asignado/requerimiento-asignado.component';
import { ModificarFichaComponent } from './pages/modificar-ficha/modificar-ficha.component';

import { ObjetoComponent } from './pages/objeto/objeto.component';

import { InicioElaboradorComponent } from './pages/inicio-elaborador/inicio-elaborador.component';
import { RequerimientoCambioComponent } from './pages/requerimiento-cambio/requerimiento-cambio.component';
import { RequerimientoCambioDetalleComponent } from './pages/requerimiento-cambio-detalle/requerimiento-cambio-detalle.component';

import { AuthGuard } from '../auth.guard';
import { elaboradorGuard } from '../elaborador.guard';

const routes: Routes = [

  //elaborador
  {path: '', component:InicioElaboradorComponent, canActivate: [AuthGuard, elaboradorGuard]},
  {path: 'homeelaborador', component:InicioElaboradorComponent, canActivate: [AuthGuard, elaboradorGuard]},
  {path: 'requerimientoDetalle', component:RequerimientoCambioDetalleComponent, canActivate: [AuthGuard, elaboradorGuard]},
  {path: 'fichatecnica', component:FichaTecnicaComponent, canActivate: [AuthGuard, elaboradorGuard]},
  {path: 'requerimientoasignado', component:RequerimientoAsignadoComponent, canActivate: [AuthGuard, elaboradorGuard]},
  {path: 'modificarficha', component:ModificarFichaComponent, canActivate: [AuthGuard, elaboradorGuard]},
  {path: 'reqdetalle', component:RequerimientoCambioComponent, canActivate: [AuthGuard, elaboradorGuard]},
  {path: 'objetos', component:ObjetoComponent, canActivate: [AuthGuard, elaboradorGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElaboradorRoutingModule { }
