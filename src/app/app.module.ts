import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioAdminComponent } from './pages/administrador/inicio-admin/inicio-admin.component';
import { InicioElaboradorComponent } from './pages/elaborador/inicio-elaborador/inicio-elaborador.component';
import { ConfigUsuarioComponent } from './pages/administrador/config-usuario/config-usuario.component';
import { TablaConfigUsuariosComponent } from './components/tabla-config-usuarios/tabla-config-usuarios.component';
import { FormularioCreacionUsuarioComponent } from './components/formulario-creacion-usuario/formulario-creacion-usuario.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    InicioAdminComponent,
    InicioElaboradorComponent,
    ConfigUsuarioComponent,
    TablaConfigUsuariosComponent,
    FormularioCreacionUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
