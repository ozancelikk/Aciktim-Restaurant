import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Restaurant } from 'src/app/models/restaurant/restaurant';
import { RestaurantComment } from 'src/app/models/restaurant/restaurantComment';
import { RestaurantDto } from 'src/app/models/restaurant/restaurantDto';
import { RestaurantMenu } from 'src/app/models/restaurant/restaurantMenu';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  restaurant:RestaurantDto;
  star:number;
  rate=new Array(0);
  restaurantMenuDetails:RestaurantMenu[];
  restaurantId:any;
  restaurantImage:string;
  comments:RestaurantComment[];
  restaurantRate=new Array(0);
  remainderRate = new Array(0)
  restaurantStatus:boolean
  restaurantIsOpen:string
  constructor(private restaurantService:RestaurantService,private activatedRoute:ActivatedRoute,private toastrService:ToastrService){}
  ngOnInit(): void {
    this.getRestaurantId();
    this.getRestaurantStatus();
    this.getRestaurantDetail(this.restaurantId);
    this.getRestaurantCommentsByRestaurantId();
    this.getRestaurantMenusByRestaurantId(this.restaurantId);
    
  }

  getRate(element:number){
    this.restaurantRate=new Array(element)
    return this.restaurantRate
  }
  getRestaurantId(){
    this.restaurantId = localStorage.getItem("restaurantId")
  }

  getRestaurantDetail(restaurantId:string){
    
    this.restaurantService.getRestaurantDetails(restaurantId).subscribe(response=>{
      if (response.success) {
        this.restaurant=response.data;
        console.log(this.restaurant)
        this.star=response.data.restaurantRate;
        this.restaurantStatus=response.data.restaurantStatus;
        this.rate=new Array(5- Math.floor(this.restaurant.restaurantRate));
        this.remainderRate=new Array(Math.floor(this.restaurant.restaurantRate))
        console.log(this.restaurantStatus)
        this.restaurantImage=response.data.imagePath;
      }
    })
  }
  getRestaurantStatus(){
    console.log(this.restaurantStatus);
    
    if (this.restaurantStatus==true) {
      this.restaurantIsOpen="Açık"
    }else{
      this.restaurantIsOpen="Kapalı"
    }
  }

  getImagePath(restaurantDto:RestaurantDto): string{
    let url:string
    return restaurantDto.imagePath != null ? "http://127.0.0.1:4200/Restaurant/"
      + restaurantDto.id + "/" + restaurantDto.imagePath : "http://127.0.0.1:4200/Restaurant/noImage.png";
  }






  changeRestaurantStatusActive(restaurant:RestaurantDto){
    this.restaurantService.changeRestaurantStatusActive(restaurant).subscribe(response=>{
      if (response.success) {
        this.restaurantStatus=true
        this.toastrService.info("Dükkan Açıldı") 
        this.getRestaurantStatus();
      }
    })
  }
  changeRestaurantStatusPassive(restaurant:RestaurantDto){
    this.restaurantService.changeRestaurantStatusPassive(restaurant).subscribe(response=>{
      if (response.success) {
        this.restaurantStatus=false
        this.toastrService.info("Dükkan Kapandı") 
        this.getRestaurantStatus();
      }
    })
  }














  getRestaurantMenusByRestaurantId(restaurantId:string){
    this.restaurantService.getRestaurantMenusByRestaurantId(restaurantId).subscribe(response=>{
      if (response.success) {
        this.restaurantMenuDetails=response.data
      }
    })
  }
  getMenusImagePath(restaurantDto: RestaurantMenu): string {
    return restaurantDto.menuImage == null ? "http://127.0.0.1:4200/Restaurant/noImage.png"
      : "http://127.0.0.1:4200/Menu/" + restaurantDto.id + "/" + restaurantDto.menuImage
  }

  getRestaurantCommentsByRestaurantId() {
    this.restaurantService.getRestaurantCommentsByRestaurantId(this.restaurantId).subscribe(response => {
      if (response.success) {
        this.comments = response.data;
        this.comments = this.comments.reverse();
      }
    })
  }
  
}
