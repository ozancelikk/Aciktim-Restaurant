import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order/order';
import { Restaurant } from 'src/app/models/restaurant/restaurant';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  activeOrders:Order[];
  passiveOrders:Order[];
  passiveText:string;
  activeText:string;
  restaurantId:any;
  restaurant:Restaurant
  constructor(private toastrService:ToastrService,private orderService:OrderService,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.getRestaurantId();
    this.getActiveOrdersByRestaurantId();
    this.getPassiveOrdersByRestaurantId();
  }
  getRestaurantId(){
    this.restaurantId=localStorage.getItem("restaurantId");
  }


  getActiveOrdersByRestaurantId(){
    this.orderService.getActiveOrderDetailsByRestaurantId(this.restaurantId).subscribe(response=>{
      if (response.success) {
        this.activeOrders=response.data;
      }
    })
  }
  getPassiveOrdersByRestaurantId(){
    this.orderService.getPassiveOrderDetailsByRestaurantId(this.restaurantId).subscribe(response=>{
      if (response.success) {
        this.passiveOrders=response.data;
      }
    })
  }

  changeOrderStatusToCourier(order:Order){
    this.orderService.changeOrderStatusToCourier(order).subscribe(response=>{
      if (response.success) {
        this.toastrService.info("Sipariş Durumu Kuryede") 
        this.getActiveOrdersByRestaurantId();
      }
    })
  }
  
  changeOrderStatusToReady(order:Order){
    this.orderService.chanceOrderStatusToReady(order).subscribe(response=>{
      if (response.success) {
        this.toastrService.info("Sipariş Durumu Hazırlanıyor") 
        this.getActiveOrdersByRestaurantId();
      }
    })
  }

  changeOrderStatusToComplete(order:Order){
    this.orderService.chanceOrderStatusToComplete(order).subscribe(response=>{
      if (response.success) {
        this.toastrService.info("Sipariş Tamamlandı") 
        this.getActiveOrdersByRestaurantId();
        this.getPassiveOrdersByRestaurantId();
      }
    })
  }
}
