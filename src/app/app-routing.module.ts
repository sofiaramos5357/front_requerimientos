import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigUsuarioComponent } from './pages/administrador/config-usuario/config-usuario.component';
import { InicioAdminComponent } from './pages/administrador/inicio-admin/inicio-admin.component';

const routes: Routes = [
  {path: '',component:InicioAdminComponent},
  {path: 'modificar', component:ConfigUsuarioComponent},
  {path: 'editarUsuario', component:ConfigUsuarioComponent},
  {path: '**',redirectTo:''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
