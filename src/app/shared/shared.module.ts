import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';

import { CheckbuttonsComponent } from './components/checkbuttons/checkbuttons.component'; // Importa ReactiveFormsModule
import { FormularioCambiarContrasenaComponent } from './components/formulario-cambiar-contrasena/formulario-cambiar-contrasena.component';
import { FormularioEditarUsuarioComponent } from './components/formulario-editar-usuario/formulario-editar-usuario.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CambiarContrasenaComponent } from './pages/cambiar-contrasena/cambiar-contrasena.component';
import { ModificarUsuarioComponent } from './pages/modificar-usuario/modificar-usuario.component';

import { AuthGuard } from '../auth.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptorService } from '../services/token-interceptor.service';
import { AppComponent } from '../app.component';


import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Layout1Component } from './components/layouts/layout1/layout1.component';
import { Layout2Component } from './components/layouts/layout2/layout2.component';
import { Layout3Component } from './components/layouts/layout3/layout3.component';

@NgModule({
  declarations: [
    CheckbuttonsComponent,
    FormularioCambiarContrasenaComponent,
    FormularioEditarUsuarioComponent,
    NavbarComponent,
    CambiarContrasenaComponent,
    ModificarUsuarioComponent,
    Layout1Component,
    Layout2Component,
    Layout3Component,
  ],
  exports: [
    CheckbuttonsComponent,
    FormularioCambiarContrasenaComponent,
    FormularioEditarUsuarioComponent,
    NavbarComponent,
    CambiarContrasenaComponent,
    ModificarUsuarioComponent,
  ],

  imports: [
    CommonModule,
    SharedRoutingModule,
    //BrowserModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
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
export class SharedModule { }
