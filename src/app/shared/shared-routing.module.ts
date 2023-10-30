// Importación de módulos y clases necesarios desde Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importación de componentes y clases personalizadas
import { CambiarContrasenaComponent } from './pages/cambiar-contrasena/cambiar-contrasena.component';
import { ModificarUsuarioComponent } from './pages/modificar-usuario/modificar-usuario.component';

// Importación del guardia de autenticación personalizado
import { AuthGuard } from '../auth.guard';

// Importación de componentes de diseño personalizados
import { Layout2Component } from './components/layouts/layout2/layout2.component';
import { Layout4Component } from './components/layouts/layout4/layout4.component';

// Definición de las rutas de la aplicación
const routes: Routes = [
  // Rutas compartidas

  {
    path: '',
    component: Layout4Component, // Utiliza Layout4Component como diseño
    children: [
      { path: 'cambiarcontrasena', component: CambiarContrasenaComponent }, // Ruta para CambiarContrasenaComponent
    ],
  },

  {
    path: '',
    component: Layout2Component, // Utiliza Layout2Component como diseño
    children: [
      {
        path: 'modificarusuario', // Ruta para ModificarUsuarioComponent
        component: ModificarUsuarioComponent,
        canActivate: [AuthGuard], // Protege la ruta con el guardia de autenticación
      },
    ],
  },
];

// Definición del módulo de rutas compartido
@NgModule({
  imports: [RouterModule.forChild(routes)], // Importa las rutas definidas anteriormente
  exports: [RouterModule], // Exporta el módulo de rutas para su uso en otros lugares
})
export class SharedRoutingModule {}
