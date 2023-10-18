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

const routes: Routes = [

    //admin
    {path: 'usuarios', component:ConfigUsuarioComponent, canActivate: [AuthGuard]},
    {path: 'crearsolicitud', component:CrearSolicitudComponent},
    {path: 'documentos', component:DocumentoComponent},
    {path: 'reportes', component:ReportesComponent},
    {path: 'visualizarreq', component:VisualizarRequerimientoComponent},
    {path: 'editarrequerimiento', component:EditarRequerimientoComponent},
    {path: 'ingresarrevision', component:IngresarRevisionComponent},
    {path: 'documentar', component:DocumentarRequerimientoComponent},
    {path: 'sistemas', component:SistemasComponent},
    {path: 'changelog', component:ChangelogComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
