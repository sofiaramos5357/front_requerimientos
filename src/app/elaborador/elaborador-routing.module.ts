// Importación de módulos y clases necesarios desde Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importación de componentes personalizados
import { FichaTecnicaComponent } from './pages/ficha-tecnica/ficha-tecnica.component';
import { RequerimientoAsignadoComponent } from './pages/requerimiento-asignado/requerimiento-asignado.component';
import { ModificarFichaComponent } from './pages/modificar-ficha/modificar-ficha.component';
import { ObjetoComponent } from './pages/objeto/objeto.component';
import { InicioElaboradorComponent } from './pages/inicio-elaborador/inicio-elaborador.component';
import { RequerimientoCambioComponent } from './pages/requerimiento-cambio/requerimiento-cambio.component';

// Importación de guardias personalizados
import { AuthGuard } from '../auth.guard';
import { elaboradorGuard } from '../elaborador.guard';

// Importación de componentes de diseño personalizados
import { Layout1Component } from '../shared/components/layouts/layout1/layout1.component';
import { Layout2Component } from '../shared/components/layouts/layout2/layout2.component';

// Definición de las rutas del módulo Elaborador
const routes: Routes = [
  {
    path: 'home',
    component: Layout1Component, // Utiliza Layout1Component como diseño
    children: [
      {
        path: 'elaborador',
        component: InicioElaboradorComponent, // Ruta para InicioElaboradorComponent
        canActivate: [AuthGuard, elaboradorGuard], // Protege la ruta con guardias de autenticación
      },
    ],
  },
  {
    path: '',
    component: Layout2Component, // Utiliza Layout2Component como diseño
    children: [
      {
        path: 'fichatecnica',
        component: FichaTecnicaComponent, // Ruta para FichaTecnicaComponent
        canActivate: [AuthGuard, elaboradorGuard], // Protege la ruta con guardias de autenticación
      },
      {
        path: 'requerimientoasignado',
        component: RequerimientoAsignadoComponent, // Ruta para RequerimientoAsignadoComponent
        canActivate: [AuthGuard, elaboradorGuard], // Protege la ruta con guardias de autenticación
      },
      {
        path: 'modificarficha',
        component: ModificarFichaComponent, // Ruta para ModificarFichaComponent
        canActivate: [AuthGuard, elaboradorGuard], // Protege la ruta con guardias de autenticación
      },
      {
        path: 'reqdetalle',
        component: RequerimientoCambioComponent, // Ruta para RequerimientoCambioComponent
        canActivate: [AuthGuard, elaboradorGuard], // Protege la ruta con guardias de autenticación
      },
      {
        path: 'objetos',
        component: ObjetoComponent, // Ruta para ObjetoComponent
        canActivate: [AuthGuard, elaboradorGuard], // Protege la ruta con guardias de autenticación
      },
    ],
  },
];

// Definición del módulo de rutas del Elaborador
@NgModule({
  imports: [RouterModule.forChild(routes)], // Importa las rutas definidas anteriormente
  exports: [RouterModule], // Exporta el módulo de rutas para su uso en otros lugares
})
export class ElaboradorRoutingModule {}
