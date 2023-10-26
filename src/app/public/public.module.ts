import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormularioCrearUsuarioComponent } from './components/formulario-crear-usuario/formulario-crear-usuario.component';
import { FormularioLoginComponent } from './components/formulario-login/formulario-login.component';
import { FormularioRecuperarContrasenaComponent } from './components/formulario-recuperar-contrasena/formulario-recuperar-contrasena.component';
import { CrearUsuarioComponent } from './pages/crear-usuario/crear-usuario.component';
import { LoginComponent } from './pages/login/login.component';
import { RecuperarContrasenaComponent } from './pages/recuperar-contrasena/recuperar-contrasena.component';

import { AuthGuard } from '../auth.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptorService } from '../services/token-interceptor.service';
import { AppComponent } from '../app.component';


import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PublicRoutingModule } from './public-routing.module';
import { CarouselComponent } from './components/carousel/carousel.component';

@NgModule({
  declarations: [
    FormularioCrearUsuarioComponent,
    FormularioLoginComponent,
    FormularioRecuperarContrasenaComponent,
    CrearUsuarioComponent,
    LoginComponent,
    RecuperarContrasenaComponent,
    CarouselComponent

  ],
  imports: [
    PublicRoutingModule,
    CommonModule,
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
export class PublicModule { }
