import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { MenusComponent } from './component/menus/menus.component';
import { MenuaddComponent } from './component/menus/menuadd/menuadd.component';
import { SupportComponent } from './component/support/support.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AccountComponent } from './component/account/account.component';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    MenusComponent,
    MenuaddComponent,
    SupportComponent,
    DashboardComponent,
    AccountComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
