import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../app/public/public.module').then((m) => m.PublicModule),
  },
  
  {
    path: '',
    loadChildren: () =>
      import('./administrador/administrador.module').then((a) => a.AdministradorModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./elaborador/elaborador.module').then((e) => e.ElaboradorModule),
  },

  //redirigir al login cuando se ponga una ruta no valida
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
