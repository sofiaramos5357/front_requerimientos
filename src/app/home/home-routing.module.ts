import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';

import { HomeComponent } from './page/home.component';
import { LoginComponent } from '../public/pages/login/login.component';

const routes: Routes = [

   //home
   {path: 'home',component:HomeComponent, canActivate: [AuthGuard]},
   //{path: '',component:LoginComponent},

   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
