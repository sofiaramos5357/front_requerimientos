import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigUsuarioComponent } from './pages/administrador/config-usuario/config-usuario.component';
import { InicioAdminComponent } from './pages/administrador/inicio-admin/inicio-admin.component';
import { CrearUsuarioComponent } from './pages/administrador/crear-usuario/crear-usuario.component';
import { CrearSolicitudComponent } from './pages/administrador/crear-solicitud/crear-solicitud.component';
import { DocumentoComponent } from './pages/administrador/documento/documento.component';
import { HistorialComponent } from './pages/administrador/historial/historial.component';
import { ModificacionUsuarioComponent } from './components/modificacion-usuario/modificacion-usuario.component';
import { ConfigUsuarioElabComponent } from './pages/elaborador/config-usuario-elab/config-usuario-elab.component';
import { InicioElaboradorComponent } from './pages/elaborador/inicio-elaborador/inicio-elaborador.component';
import { RequerimientoCambioComponent } from './pages/elaborador/requerimiento-cambio/requerimiento-cambio.component';
import { RequerimientoCambioDetalleComponent } from './pages/elaborador/requerimiento-cambio-detalle/requerimiento-cambio-detalle.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path: '',component:InicioAdminComponent},
  {path: 'modificar', component:ConfigUsuarioComponent},
  {path: 'crearsolicitud', component:CrearSolicitudComponent},
  {path: 'crearusuario', component:CrearUsuarioComponent},
  {path: 'documento', component:DocumentoComponent},
  {path: 'historial', component:HistorialComponent},
  {path: 'editarUsuario', component:ModificacionUsuarioComponent},
  {path: '**',redirectTo:''},

  {path: 'configusuario', component:ConfigUsuarioElabComponent},
  {path: 'inicioElab', component:InicioElaboradorComponent},
  {path: 'requerimiento', component:RequerimientoCambioComponent},
  {path: 'requerimientoDetalle', component:RequerimientoCambioDetalleComponent},

  //funciona raro
  {path: 'login', component:LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
