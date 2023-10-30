import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../auth.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptorService } from '../services/token-interceptor.service';
import { AppComponent } from '../app.component';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { ElementosChangelogComponent } from './components/elementos-changelog/elementos-changelog.component';
import { ElementosDocumentarComponent } from './components/elementos-documentar/elementos-documentar.component';
import { ElementosEditarDocumentoComponent } from './components/elementos-editar-documento/elementos-editar-documento.component';
import { ElementosIngresarRevisionComponent } from './components/elementos-ingresar-revision/elementos-ingresar-revision.component';
import { ElementosReportesComponent } from './components/elementos-reportes/elementos-reportes.component';
import { ElementosSistemasComponent } from './components/elementos-sistemas/elementos-sistemas.component';
import { FormularioCrearSolicitudComponent } from './components/formulario-crear-solicitud/formulario-crear-solicitud.component';
import { FormularioEditarReqComponent } from './components/formulario-editar-req/formulario-editar-req.component';
import { FormularioVisualizarReqComponent } from './components/formulario-visualizar-req/formulario-visualizar-req.component';
import { TablaConfigUsuariosComponent } from './components/tabla-config-usuarios/tabla-config-usuarios.component';
import { TablaInicialComponent } from './components/tabla-inicial/tabla-inicial.component';
import { TablaReqDocumentarComponent } from './components/tabla-req-documentar/tabla-req-documentar.component';
import { TablaRevisarComponent } from './components/tabla-revisar/tabla-revisar.component';
import { ChangelogComponent } from './pages/changelog/changelog.component';
import { CrearSolicitudComponent } from './pages/crear-solicitud/crear-solicitud.component';
import { DocumentarRequerimientoComponent } from './pages/documentar-requerimiento/documentar-requerimiento.component';
import { DocumentoComponent } from './pages/documento/documento.component';
import { EditarRequerimientoComponent } from './pages/editar-requerimiento/editar-requerimiento.component';
import { IngresarRevisionComponent } from './pages/ingresar-revision/ingresar-revision.component';
import { InicioAdminComponent } from './pages/inicio-admin/inicio-admin.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { SistemasComponent } from './pages/sistemas/sistemas.component';
import { VisualizarRequerimientoComponent } from './pages/visualizar-requerimiento/visualizar-requerimiento.component';
import { ConfigUsuarioComponent } from './pages/usuarios/usuarios.component';

//import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    ElementosChangelogComponent,
    ElementosDocumentarComponent,
    ElementosEditarDocumentoComponent,
    ElementosIngresarRevisionComponent,
    ElementosReportesComponent,
    ElementosSistemasComponent,
    FormularioCrearSolicitudComponent,
    FormularioEditarReqComponent,
    FormularioVisualizarReqComponent,
    TablaConfigUsuariosComponent,
    TablaInicialComponent,
    TablaReqDocumentarComponent,
    TablaRevisarComponent,
    ChangelogComponent,
    CrearSolicitudComponent,
    DocumentarRequerimientoComponent,
    DocumentoComponent,
    EditarRequerimientoComponent,
    IngresarRevisionComponent,
    InicioAdminComponent,
    ReportesComponent,
    SistemasComponent,
    VisualizarRequerimientoComponent,
    ConfigUsuarioComponent,
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    //BrowserModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,

    SharedModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [],
})
export class AdministradorModule {}
