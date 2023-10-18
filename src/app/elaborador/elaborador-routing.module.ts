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

const routes: Routes = [

    //elaborador
    {path: 'inicioElab', component:InicioElaboradorComponent},
    {path: 'requerimientoDetalle', component:RequerimientoCambioDetalleComponent},
    {path: 'fichatecnica', component:FichaTecnicaComponent},
    {path: 'requerimientoasignado', component:RequerimientoAsignadoComponent},
    {path: 'modificarficha', component:ModificarFichaComponent},
    {path: 'reqdetalle', component:RequerimientoCambioComponent},
    {path: 'objetos', component:ObjetoComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElaboradorRoutingModule { }
