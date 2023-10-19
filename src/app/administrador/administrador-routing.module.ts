import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';

import { SistemasComponent } from './pages/sistemas/sistemas.component';
import { ChangelogComponent } from './pages/changelog/changelog.component';
import { IngresarRevisionComponent } from './pages/ingresar-revision/ingresar-revision.component';
import { DocumentarRequerimientoComponent } from './pages/documentar-requerimiento/documentar-requerimiento.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { VisualizarRequerimientoComponent } from './pages/visualizar-requerimiento/visualizar-requerimiento.component';
import { EditarRequerimientoComponent } from './pages/editar-requerimiento/editar-requerimiento.component';
import { CrearSolicitudComponent } from './pages/crear-solicitud/crear-solicitud.component';
import { DocumentoComponent } from './pages/documento/documento.component';
import { ConfigUsuarioComponent } from './pages/usuarios/usuarios.component';
import { adminGuard } from '../admin.guard';
import { InicioAdminComponent } from './pages/inicio-admin/inicio-admin.component';

const routes: Routes = [

  //admin
  {path: '',component:InicioAdminComponent, canActivate: [AuthGuard, adminGuard]},
  {path: 'homeadmin', component:InicioAdminComponent, canActivate: [AuthGuard, adminGuard]},
  {path: 'usuarios', component:ConfigUsuarioComponent, canActivate: [AuthGuard, adminGuard]},
  {path: 'crearsolicitud', component:CrearSolicitudComponent, canActivate: [AuthGuard, adminGuard]},
  {path: 'documentos', component:DocumentoComponent, canActivate: [AuthGuard, adminGuard]},
  {path: 'reportes', component:ReportesComponent, canActivate: [AuthGuard, adminGuard]},
  {path: 'visualizarreq', component:VisualizarRequerimientoComponent, canActivate: [AuthGuard, adminGuard]},
  {path: 'editarrequerimiento', component:EditarRequerimientoComponent, canActivate: [AuthGuard, adminGuard]},
  {path: 'ingresarrevision', component:IngresarRevisionComponent, canActivate: [AuthGuard, adminGuard]},
  {path: 'documentar', component:DocumentarRequerimientoComponent, canActivate: [AuthGuard, adminGuard]},
  {path: 'sistemas', component:SistemasComponent, canActivate: [AuthGuard, adminGuard]},
  {path: 'changelog', component:ChangelogComponent, canActivate: [AuthGuard, adminGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
