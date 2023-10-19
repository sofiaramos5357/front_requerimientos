import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElaboradorRoutingModule } from './elaborador-routing.module';

import { ElementosReDetalleComponent } from './components/elementos-re-detalle/elementos-re-detalle.component';
import { FormularioFichaTecnicaComponent } from './components/formulario-ficha-tecnica/formulario-ficha-tecnica.component';
import { FormularioModificarFichaComponent } from './components/formulario-modificar-ficha/formulario-modificar-ficha.component';
import { FormularioReqAsignadoComponent } from './components/formulario-req-asignado/formulario-req-asignado.component';
import { TablaObjetoComponent } from './components/tabla-objeto/tabla-objeto.component';
import { TablaInicialElabComponent } from './components/tabla-req-asignados/tabla-inicial-elab.component';
import { TablaReqPendienteRevisionComponent } from './components/tabla-req-pendiente-revision/tabla-req-pendiente-revision.component';
import { TablaReqProcesoComponent } from './components/tabla-req-proceso/tabla-req-proceso.component';
import { TablaTipoCambioComponent } from './components/tabla-tipo-cambio/tabla-tipo-cambio.component';
import { FichaTecnicaComponent } from './pages/ficha-tecnica/ficha-tecnica.component';
import { InicioElaboradorComponent } from './pages/inicio-elaborador/inicio-elaborador.component';
import { ModificarFichaComponent } from './pages/modificar-ficha/modificar-ficha.component';
import { ObjetoComponent } from './pages/objeto/objeto.component';
import { RequerimientoAsignadoComponent } from './pages/requerimiento-asignado/requerimiento-asignado.component';
import { RequerimientoCambioComponent } from './pages/requerimiento-cambio/requerimiento-cambio.component';
import { RequerimientoCambioDetalleComponent } from './pages/requerimiento-cambio-detalle/requerimiento-cambio-detalle.component';

import { AuthGuard } from '../auth.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptorService } from '../services/token-interceptor.service';
import { AppComponent } from '../app.component';


import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    ElementosReDetalleComponent,
    FormularioFichaTecnicaComponent,
    FormularioModificarFichaComponent,
    FormularioReqAsignadoComponent,
    TablaObjetoComponent,
    TablaInicialElabComponent,
    TablaReqPendienteRevisionComponent,
    TablaReqProcesoComponent,
    TablaTipoCambioComponent,
    FichaTecnicaComponent,
    InicioElaboradorComponent,
    ModificarFichaComponent,
    ObjetoComponent,
    RequerimientoAsignadoComponent,
    RequerimientoCambioComponent,
    RequerimientoCambioDetalleComponent,

    

  ],
  imports: [
    CommonModule,
    ElaboradorRoutingModule,
    //BrowserModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,

    SharedModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: []
})
export class ElaboradorModule { }
