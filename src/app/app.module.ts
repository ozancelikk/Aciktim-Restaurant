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
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule} from '@angular/material/radio';
import { OrderCustomerIdPipe } from './pipes/order-customer-id.pipe';
import { ChartModule } from 'angular-highcharts';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RestaurantApplicationComponent } from './component/restaurant-application/restaurant-application.component';
import { OrderComponent } from './component/order/order.component';

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
    OrderCustomerIdPipe,
    RestaurantApplicationComponent,
    OrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartModule,
    BrowserAnimationsModule,
    FormsModule,
    MatRadioModule,
    DragDropModule,
    MatDialogModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      preventDuplicates: false,
      closeButton: true,
      countDuplicates: true,
      positionClass: "toast-bottom-right",
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
