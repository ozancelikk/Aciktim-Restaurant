import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { MenusComponent } from './component/menus/menus.component';
import { MenuaddComponent } from './component/menus/menuadd/menuadd.component';
import { SupportComponent } from './component/support/support.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AccountComponent } from './component/account/account.component';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:HomeComponent,children:[
    {path:"",component:MenusComponent},
    // {path:"",component:SliderComponent},
  ]},
  {path:"menuadd",component:MenuaddComponent},
  {path:"support",component:SupportComponent},
  {path:"dashboard",component:DashboardComponent},
  {path:"account",component:AccountComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

