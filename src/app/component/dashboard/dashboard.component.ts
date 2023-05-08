import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order/order';
import { Restaurant } from 'src/app/models/restaurant/restaurant';
import { OrderService } from 'src/app/services/order/order.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  noShow:boolean=false
  restaurantId:any;
  todayOrdersNumber:number=0;
  restaurantOrders:Order[];
  todayGain:number=0;
  restaurantActiveOrders:number=0;
  totalOrderNumber:number=0


  constructor(private orderService: OrderService, private toastrService: ToastrService,private restaurantService: RestaurantService) { }
  ngOnInit(): void {
    this.getRestaurantId();
    this.calculateTodayGain();
    this.getRestaurantActiveOrders();
  }

  getRestaurantId(){
    this.restaurantId=localStorage.getItem("restaurantId")
  }

  getRestaurantPassiveOrders(successCallBack?:()=>void){
    this.orderService.getPassiveOrderDetailsByRestaurantId(this.restaurantId).subscribe(response=>{
      if (response.success) {
        this.restaurantOrders=response.data
        this.totalOrderNumber=response.data.length
        if (successCallBack) {
          successCallBack();
        }
      }else{
        this.toastrService.error("Bir Hata Meydana Geldi","HATA")
      }
    })
  }
  getRestaurantActiveOrders(){
    this.orderService.getActiveOrderDetailsByRestaurantId(this.restaurantId).subscribe(response=>{
      if (response.success) {
        this.restaurantActiveOrders=response.data.length 
      }else{
        this.toastrService.error("Bir Hata Meydana Geldi","HATA")
      }
    })
  }

  

  calculateTodayGain() {
    const date = new Date();
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;
    this.getRestaurantPassiveOrders(() => {
      console.log(this.restaurantOrders);
      for (let i = 0; i < this.restaurantOrders.length; i++) {
        let split2 = this.restaurantOrders[i].orderDate.split(/[,\s]+/)[0];
        if (split2==formattedDate) {
          this.todayOrdersNumber++;
        }
        for (let j = 0; j < this.restaurantOrders[i].menus.length; j++) {
          let split = this.restaurantOrders[i].orderDate.split(/[,\s]+/)[0];
          if (split == formattedDate ) {
             this.todayGain+= (((this.restaurantOrders[i].menus[j].orderPrice) * (this.restaurantOrders[i].menus[j].quantity)) * 90) / 100
          }
        }
      }
    })
  }
 
  changeVisibility() {
    this.noShow = !this.noShow
  }

  giveClass() {
    if (this.noShow == true) {
      return 'resizable'
    }
    else {
      return ''
    }
  }

  

}

