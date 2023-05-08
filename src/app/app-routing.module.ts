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
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { StatusGuardGuard } from './guard/status-guard.guard';
import { RestaurantApplicationComponent } from './component/restaurant-application/restaurant-application.component';
import { OrderComponent } from './component/order/order.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:LoginComponent},
  {path:"home",component:HomeComponent,canActivate:[AuthGuardGuard,StatusGuardGuard],children:[
    {path:"",component:MenusComponent ,canActivate:[AuthGuardGuard,StatusGuardGuard]},
    // {path:"",component:SliderComponent},
  ]},
  {path:"menuadd",component:MenuaddComponent ,canActivate:[AuthGuardGuard,StatusGuardGuard]},
  {path:"support",component:SupportComponent ,canActivate:[AuthGuardGuard,StatusGuardGuard]},
  {path:"dashboard",component:DashboardComponent ,canActivate:[AuthGuardGuard,StatusGuardGuard]},
  {path:"account",component:AccountComponent ,canActivate:[AuthGuardGuard,StatusGuardGuard]},
  {path:"login",component:LoginComponent },
  {path:"register",component:RegisterComponent},
  {path:"restaurantApplication",component:RestaurantApplicationComponent},
  {path:"order",component:OrderComponent,canActivate:[AuthGuardGuard,StatusGuardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

