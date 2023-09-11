import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioAdminComponent } from './pages/administrador/inicio-admin/inicio-admin.component';
import { InicioElaboradorComponent } from './pages/elaborador/inicio-elaborador/inicio-elaborador.component';
import { ConfigUsuarioComponent } from './pages/administrador/config-usuario/config-usuario.component';
import { TablaConfigUsuariosComponent } from './components/tabla-config-usuarios/tabla-config-usuarios.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormularioEditarUsuarioComponent } from './components/formulario-editar-usuario/formulario-editar-usuario.component';
import { CrearSolicitudComponent } from './pages/administrador/crear-solicitud/crear-solicitud.component';
import { ModificacionUsuarioComponent } from './pages/administrador/modificacion-usuario/modificacion-usuario.component';
import { HistorialComponent } from './pages/administrador/historial/historial.component';
import { CrearUsuarioComponent } from './pages/public/crear-usuario/crear-usuario.component';
import { DocumentoComponent } from './pages/administrador/documento/documento.component';
import { RequerimientoCambioComponent } from './pages/elaborador/requerimiento-cambio/requerimiento-cambio.component';
import { RequerimientoCambioDetalleComponent } from './pages/elaborador/requerimiento-cambio-detalle/requerimiento-cambio-detalle.component';
import { FormularioCrearSolicitudComponent } from './components/formulario-crear-solicitud/formulario-crear-solicitud.component';
import { FormularioCrearUsuarioComponent } from './components/formulario-crear-usuario/formulario-crear-usuario.component';
import { FormularioDocumentoComponent } from './components/formulario-documento/formulario-documento.component';
import { TablaHistorialComponent } from './components/tabla-historial/tabla-historial.component';
import { TablaInicialComponent } from './components/tabla-inicial/tabla-inicial.component';
import { FormularioRequerimientoComponent } from './components/formulario-requerimiento/formulario-requerimiento.component';
import { FormularioRequerimientoDetalleComponent } from './components/formulario-requerimiento-detalle/formulario-requerimiento-detalle.component';
import { ConfigUsuarioElabComponent } from './pages/elaborador/config-usuario-elab/config-usuario-elab.component';
import { LoginComponent } from './pages/public/login/login.component';
import { FormularioLoginComponent } from './components/formulario-login/formulario-login.component';
import { FormularioRecuperarContrasenaComponent } from './components/formulario-recuperar-contrasena/formulario-recuperar-contrasena.component';
import { RecuperarContrasenaComponent } from './pages/public/recuperar-contrasena/recuperar-contrasena.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { HttpInterceptor } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    InicioAdminComponent,
    InicioElaboradorComponent,
    ConfigUsuarioComponent,
    TablaConfigUsuariosComponent,
    FormularioEditarUsuarioComponent,
    CrearSolicitudComponent,
    ModificacionUsuarioComponent,
    HistorialComponent,
    CrearUsuarioComponent,
    DocumentoComponent,
    RequerimientoCambioComponent,
    RequerimientoCambioDetalleComponent,
    FormularioCrearSolicitudComponent,
    FormularioCrearUsuarioComponent,
    FormularioDocumentoComponent,
    TablaHistorialComponent,
    TablaInicialComponent,
    FormularioRequerimientoComponent,
    FormularioRequerimientoDetalleComponent,
    ConfigUsuarioElabComponent,
    LoginComponent,
    FormularioLoginComponent,
    FormularioRecuperarContrasenaComponent,
    RecuperarContrasenaComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule
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
