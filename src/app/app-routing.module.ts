// Importar módulos y servicios necesarios de Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Definir las rutas de la aplicación
const routes: Routes = [
  {
    path: '', // Ruta raíz
    loadChildren: () =>
      import('../app/public/public.module').then((m) => m.PublicModule), // Cargar el módulo PublicModule cuando se acceda a esta ruta
  },

  {
    path: '', // Ruta raíz
    loadChildren: () =>
      import('./administrador/administrador.module').then(
        (a) => a.AdministradorModule
      ), // Cargar el módulo AdministradorModule cuando se acceda a esta ruta
  },
  {
    path: '', // Ruta raíz
    loadChildren: () =>
      import('./elaborador/elaborador.module').then((e) => e.ElaboradorModule), // Cargar el módulo ElaboradorModule cuando se acceda a esta ruta
  },

  // Redirigir al usuario a la ruta raíz ('') cuando se ingrese una ruta no válida
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configurar el enrutador de la aplicación con las rutas definidas
  exports: [RouterModule], // Exportar el módulo de enrutamiento para que esté disponible en otros lugares de la aplicación
})
export class AppRoutingModule {}
