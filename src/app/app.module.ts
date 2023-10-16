import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioAdminComponent } from './pages/administrador/inicio-admin/inicio-admin.component';
import { InicioElaboradorComponent } from './pages/elaborador/inicio-elaborador/inicio-elaborador.component';
import { ConfigUsuarioComponent } from './pages/administrador/usuarios/usuarios.component';
import { TablaConfigUsuariosComponent } from './components/administrador/tabla-config-usuarios/tabla-config-usuarios.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormularioEditarUsuarioComponent } from './components/shared/formulario-editar-usuario/formulario-editar-usuario.component';
import { CrearSolicitudComponent } from './pages/administrador/crear-solicitud/crear-solicitud.component';
import { CrearUsuarioComponent } from './pages/public/crear-usuario/crear-usuario.component';
import { DocumentoComponent } from './pages/administrador/documento/documento.component';
import { RequerimientoCambioComponent } from './pages/elaborador/requerimiento-cambio/requerimiento-cambio.component';
import { RequerimientoCambioDetalleComponent } from './pages/elaborador/requerimiento-cambio-detalle/requerimiento-cambio-detalle.component';
import { FormularioCrearSolicitudComponent } from './components/administrador/formulario-crear-solicitud/formulario-crear-solicitud.component';
import { FormularioCrearUsuarioComponent } from './components/public/formulario-crear-usuario/formulario-crear-usuario.component';
import { TablaHistorialComponent } from './components/shared/tabla-historial/tabla-historial.component';
import { TablaInicialComponent } from './components/administrador/tabla-inicial/tabla-inicial.component';
import { LoginComponent } from './pages/public/login/login.component';
import { FormularioLoginComponent } from './components/public/formulario-login/formulario-login.component';
import { FormularioRecuperarContrasenaComponent } from './components/public/formulario-recuperar-contrasena/formulario-recuperar-contrasena.component';
import { RecuperarContrasenaComponent } from './pages/public/recuperar-contrasena/recuperar-contrasena.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { HttpInterceptor } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { HomeComponent } from './pages/home/home/home.component';
import { VisualizarRequerimientoComponent } from './pages/administrador/visualizar-requerimiento/visualizar-requerimiento.component';
import { FormularioVisualizarReqComponent } from './components/administrador/formulario-visualizar-req/formulario-visualizar-req.component';
import { EditarRequerimientoComponent } from './pages/administrador/editar-requerimiento/editar-requerimiento.component';
import { FormularioEditarReqComponent } from './components/administrador/formulario-editar-req/formulario-editar-req.component';
import { TablaInicialElabComponent } from './components/elaborador/tabla-req-asignados/tabla-inicial-elab.component';
import { FormularioFichaTecnicaComponent } from './components/elaborador/formulario-ficha-tecnica/formulario-ficha-tecnica.component';
import { FichaTecnicaComponent } from './pages/elaborador/ficha-tecnica/ficha-tecnica.component';
import { FormularioReqAsignadoComponent } from './components/elaborador/formulario-req-asignado/formulario-req-asignado.component';
import { RequerimientoAsignadoComponent } from './pages/elaborador/requerimiento-asignado/requerimiento-asignado.component';
import { TablaReqProcesoComponent } from './components/elaborador/tabla-req-proceso/tabla-req-proceso.component';
import { FormularioModificarFichaComponent } from './components/elaborador/formulario-modificar-ficha/formulario-modificar-ficha.component';
import { ModificarFichaComponent } from './pages/elaborador/modificar-ficha/modificar-ficha.component';
import { ElementosReDetalleComponent } from './components/elaborador/elementos-re-detalle/elementos-re-detalle.component';
import { TablaReqPendienteRevisionComponent } from './components/elaborador/tabla-req-pendiente-revision/tabla-req-pendiente-revision.component';
import { TablaRevisarComponent } from './components/administrador/tabla-revisar/tabla-revisar.component';
import { IngresarRevisionComponent } from './pages/administrador/ingresar-revision/ingresar-revision.component';
import { ElementosIngresarRevisionComponent } from './components/administrador/elementos-ingresar-revision/elementos-ingresar-revision.component';
import { TablaReqDocumentarComponent } from './components/administrador/tabla-req-documentar/tabla-req-documentar.component';
import { DocumentarRequerimientoComponent } from './pages/administrador/documentar-requerimiento/documentar-requerimiento.component';
import { ElementosDocumentarComponent } from './components/administrador/elementos-documentar/elementos-documentar.component';
import { ElementosEditarDocumentoComponent } from './components/administrador/elementos-editar-documento/elementos-editar-documento.component';
import { ElementosReportesComponent } from './components/administrador/elementos-reportes/elementos-reportes.component';
import { ReportesComponent } from './pages/administrador/reportes/reportes.component';


import { ReactiveFormsModule } from '@angular/forms';
import { ObjetoComponent } from './pages/elaborador/objeto/objeto.component';
import { TablaObjetoComponent } from './components/elaborador/tabla-objeto/tabla-objeto.component';
import { TablaTipoCambioComponent } from './components/elaborador/tabla-tipo-cambio/tabla-tipo-cambio.component';
import { SistemasComponent } from './pages/administrador/sistemas/sistemas.component';
import { ElementosSistemasComponent } from './components/administrador/elementos-sistemas/elementos-sistemas.component';
import { ChangelogComponent } from './pages/administrador/changelog/changelog.component';
import { ElementosChangelogComponent } from './components/administrador/elementos-changelog/elementos-changelog.component';
import { CambiarContrasenaComponent } from './pages/shared/cambiar-contrasena/cambiar-contrasena.component';
import { FormularioCambiarContrasenaComponent } from './components/shared/formulario-cambiar-contrasena/formulario-cambiar-contrasena.component';
import { ModificarUsuarioComponent } from './pages/shared/modificar-usuario/modificar-usuario.component'; // Importa ReactiveFormsModule

@NgModule({
  declarations: [
    AppComponent,
    InicioAdminComponent,
    InicioElaboradorComponent,
    ConfigUsuarioComponent,
    TablaConfigUsuariosComponent,
    FormularioEditarUsuarioComponent,
    CrearSolicitudComponent,
    CrearUsuarioComponent,
    DocumentoComponent,
    RequerimientoCambioComponent,
    RequerimientoCambioDetalleComponent,
    FormularioCrearSolicitudComponent,
    FormularioCrearUsuarioComponent,
    TablaHistorialComponent,
    TablaInicialComponent,
    LoginComponent,
    FormularioLoginComponent,
    FormularioRecuperarContrasenaComponent,
    RecuperarContrasenaComponent,
    NavbarComponent,
    HomeComponent,
    VisualizarRequerimientoComponent,
    FormularioVisualizarReqComponent,
    EditarRequerimientoComponent,
    FormularioEditarReqComponent,
    TablaInicialElabComponent,
    FormularioFichaTecnicaComponent,
    FichaTecnicaComponent,
    FormularioReqAsignadoComponent,
    RequerimientoAsignadoComponent,
    TablaReqProcesoComponent,
    FormularioModificarFichaComponent,
    ModificarFichaComponent,
    ElementosReDetalleComponent,
    TablaReqPendienteRevisionComponent,
    TablaRevisarComponent,
    IngresarRevisionComponent,
    ElementosIngresarRevisionComponent,
    TablaReqDocumentarComponent,
    DocumentarRequerimientoComponent,
    ElementosDocumentarComponent,
    ElementosEditarDocumentoComponent,
    ElementosReportesComponent,
    ReportesComponent,
    ObjetoComponent,
    TablaObjetoComponent,
    TablaTipoCambioComponent,
    SistemasComponent,
    ElementosSistemasComponent,
    ChangelogComponent,
    ElementosChangelogComponent,
    CambiarContrasenaComponent,
    FormularioCambiarContrasenaComponent,
    ModificarUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
