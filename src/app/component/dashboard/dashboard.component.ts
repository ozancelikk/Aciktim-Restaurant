import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order/order';
import { OrderDictionary } from 'src/app/models/order/orderDictionary';
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
  topOrderMenus:OrderDictionary[];
  pieChart:any


  constructor(private orderService: OrderService, private toastrService: ToastrService,private restaurantService: RestaurantService) { }
  ngOnInit(): void {
    this.getRestaurantId();
    this.calculateTodayGain();
    this.getRestaurantActiveOrders();
    this.createPieChartForTopOrderMenus();
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

  getTopOrderMenus(successCallBack?:()=>void){
    this.orderService.getOrdersByRestaurantId(this.restaurantId).subscribe(response=>{
      response.success ? this.topOrderMenus=response.data:this.toastrService.error("Bir Hata Meydana Geldi","Hata")
      if (successCallBack) {
        successCallBack();
      }
    })
  }

  createPieChartForTopOrderMenus(){
    this.getTopOrderMenus(() => {
      let data = [];
      for (let i = 0; i < this.topOrderMenus.length; i++) {
        data.push([this.topOrderMenus[i].menuName, this.topOrderMenus[i].quantity]);
      }
      console.log(data);
      
      this.pieChart = new Chart
        (
          {
            chart: {
              plotBorderWidth: null,
              plotShadow: false
            },
            accessibility: {
              enabled: false
            },
            title: {
              text: 'En çok Sipariş Alan Menüler'
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
              pie: {
                shadow: false,
                center: ['50%', '50%'],
                size: '85%',
                innerSize: '20%'
              }
            },
            series: [{
              type: 'pie',
              name: 'Satış Oranı',
              data: data
            }
            ]
          }
        )
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

