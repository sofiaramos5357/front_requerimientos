// Importación de módulos y clases necesarios desde Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importación de guardias personalizados
import { AuthGuard } from '../auth.guard';
import { adminGuard } from '../admin.guard';

// Importación de componentes personalizados
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
import { InicioAdminComponent } from './pages/inicio-admin/inicio-admin.component';

// Importación de componentes de diseño personalizados
import { Layout1Component } from '../shared/components/layouts/layout1/layout1.component';
import { Layout2Component } from '../shared/components/layouts/layout2/layout2.component';

// Definición de las rutas del módulo Administrador
const routes: Routes = [
  // Rutas de administrador
  {
    path: 'home',
    component: Layout1Component, // Utiliza Layout1Component como diseño
    children: [
      {
        path: 'admin',
        component: InicioAdminComponent, // Ruta para InicioAdminComponent
        canActivate: [AuthGuard, adminGuard], // Protege la ruta con guardias de autenticación
      },
    ],
  },

  {
    path: '',
    component: Layout2Component, // Utiliza Layout2Component como diseño
    children: [
      {
        path: 'usuarios',
        component: ConfigUsuarioComponent, // Ruta para ConfigUsuarioComponent
        canActivate: [AuthGuard, adminGuard], // Protege la ruta con guardias de autenticación
      },
      {
        path: 'crearsolicitud',
        component: CrearSolicitudComponent, // Ruta para CrearSolicitudComponent
        canActivate: [AuthGuard, adminGuard], // Protege la ruta con guardias de autenticación
      },
      {
        path: 'documentos',
        component: DocumentoComponent, // Ruta para DocumentoComponent
        canActivate: [AuthGuard, adminGuard], // Protege la ruta con guardias de autenticación
      },
      {
        path: 'reportes',
        component: ReportesComponent, // Ruta para ReportesComponent
        canActivate: [AuthGuard, adminGuard], // Protege la ruta con guardias de autenticación
      },
      {
        path: 'visualizarreq',
        component: VisualizarRequerimientoComponent, // Ruta para VisualizarRequerimientoComponent
        canActivate: [AuthGuard, adminGuard], // Protege la ruta con guardias de autenticación
      },
      {
        path: 'editarrequerimiento',
        component: EditarRequerimientoComponent, // Ruta para EditarRequerimientoComponent
        canActivate: [AuthGuard, adminGuard], // Protege la ruta con guardias de autenticación
      },
      {
        path: 'ingresarrevision',
        component: IngresarRevisionComponent, // Ruta para IngresarRevisionComponent
        canActivate: [AuthGuard, adminGuard], // Protege la ruta con guardias de autenticación
      },
      {
        path: 'documentar',
        component: DocumentarRequerimientoComponent, // Ruta para DocumentarRequerimientoComponent
        canActivate: [AuthGuard, adminGuard], // Protege la ruta con guardias de autenticación
      },
      {
        path: 'sistemas',
        component: SistemasComponent, // Ruta para SistemasComponent
        canActivate: [AuthGuard, adminGuard], // Protege la ruta con guardias de autenticación
      },
      {
        path: 'changelog',
        component: ChangelogComponent, // Ruta para ChangelogComponent
        canActivate: [AuthGuard, adminGuard], // Protege la ruta con guardias de autenticación
      },
    ],
  },
];

// Definición del módulo de rutas del Administrador
@NgModule({
  imports: [RouterModule.forChild(routes)], // Importa las rutas definidas anteriormente
  exports: [RouterModule], // Exporta el módulo de rutas para su uso en otros lugares
})
export class AdministradorRoutingModule {}
