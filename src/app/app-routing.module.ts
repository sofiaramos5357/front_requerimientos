import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigUsuarioComponent } from './pages/administrador/usuarios/usuarios.component';
import { CrearUsuarioComponent } from './pages/public/crear-usuario/crear-usuario.component';
import { CrearSolicitudComponent } from './pages/administrador/crear-solicitud/crear-solicitud.component';
import { DocumentoComponent } from './pages/administrador/documento/documento.component';
import { HistorialComponent } from './pages/administrador/historial/historial.component';
import { ModificacionUsuarioComponent } from './components/administrador/modificacion-usuario/modificacion-usuario.component';
import { ConfigUsuarioElabComponent } from './pages/elaborador/config-usuario-elab/config-usuario-elab.component';
import { InicioElaboradorComponent } from './pages/elaborador/inicio-elaborador/inicio-elaborador.component';
import { RequerimientoCambioComponent } from './pages/elaborador/requerimiento-cambio/requerimiento-cambio.component';
import { RequerimientoCambioDetalleComponent } from './pages/elaborador/requerimiento-cambio-detalle/requerimiento-cambio-detalle.component';
import { LoginComponent } from './pages/public/login/login.component';
import { RecuperarContrasenaComponent } from './pages/public/recuperar-contrasena/recuperar-contrasena.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './pages/home/home/home.component';

const routes: Routes = [

  //public
  {path: 'crearusuario', component:CrearUsuarioComponent},
  {path: 'recuperarcontrasena', component:RecuperarContrasenaComponent},

  //home
  {path: 'home',component:HomeComponent, canActivate: [AuthGuard]},
  {path: '',component:LoginComponent},

  //admin
  {path: 'usuarios', component:ConfigUsuarioComponent, canActivate: [AuthGuard]},
  {path: 'crearsolicitud', component:CrearSolicitudComponent},
  {path: 'documento', component:DocumentoComponent},
  {path: 'historial', component:HistorialComponent},
  {path: 'editarUsuario', component:ModificacionUsuarioComponent},

  //elaborador
  {path: 'configusuario', component:ConfigUsuarioElabComponent},
  {path: 'inicioElab', component:InicioElaboradorComponent},
  {path: 'requerimiento', component:RequerimientoCambioComponent},
  {path: 'requerimientoDetalle', component:RequerimientoCambioDetalleComponent},

  //redirigir al login cuando se ponga una ruta no valida
  {path: '**',redirectTo:''},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
