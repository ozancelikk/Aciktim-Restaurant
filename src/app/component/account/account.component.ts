import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Restaurant } from 'src/app/models/restaurant/restaurant';
import { RestaurantDto } from 'src/app/models/restaurant/restaurantDto';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RestaurantImageService } from 'src/app/services/restaurant/restaurant-image.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  verifyPassword: string;
  password: string;
  changePasswordForm: FormGroup;
  restaurantId:any
  mailAddress: string;
  registerDate:string
  imageId:any;
  restaurant:RestaurantDto
  file:File
  constructor( private formBuilder:FormBuilder,private toastrService:ToastrService,private authservice:AuthService,private restaurantService:RestaurantService,private router:Router,private restaurantImageService:RestaurantImageService){}
  ngOnInit(): void {

    this.getRestaurantId();
    this.getImage();
    this.createchangePasswordForm();
    this.getById();
  }

  createchangePasswordForm(){
    this.changePasswordForm=this.formBuilder.group({
      oldPassword: ["",Validators.required],
      newPassword: ["",Validators.required]
    });
  }
  getRestaurantId(){
    this.restaurantId=localStorage.getItem("restaurantId"); 
  }

  changePassword(){
    let model=Object.assign({},this.changePasswordForm.value);
    model["eMail"]=this.mailAddress;
    if (this.changePasswordForm.valid) {
      if (this.verifyPassword!=this.password) {
        this.toastrService.error("Şifreler Uyuşmuyor","HATA");
      }
      else{
        this.authservice.changePassword(model).subscribe(response=>{
          if (response.success) {
            this.toastrService.success("Şifreniz Başarıyla Değiştirilmiştir","BAŞARILI")
            setTimeout(()=>{
              window.location.reload();
            },1000)
          }
        },errResponse=>{
          this.toastrService.error(errResponse.error,"HATA");
        })
      }
    }
    else{
      this.toastrService.error("Lütfen Bilgileriniz Eksiksiz Giriniz");
    }
  }
  getImagePath(restaurantDto:RestaurantDto): string{
    let url:string
    return restaurantDto.imagePath != null ? "http://127.0.0.1:4200/Restaurant/"
      + restaurantDto.id + "/" + restaurantDto.imagePath : "http://127.0.0.1:4200/Restaurant/noImage.png";
  }

  getById(){
    this.authservice.getById(this.restaurantId).subscribe(response=>{
      if (response.success) {
        this.restaurant=response.data
        this.mailAddress=response.data.mailAddress
        console.log(response.data);
        
      }
    })
  }

  updateImage(){
    let model = {
      restaurantId:this.restaurantId,
      image:this.file,
      id:this.imageId
    }
    this.restaurantImageService.updateImage(model).subscribe(response=>{
      if (response.success) {
        this.toastrService.success("Profil Resmi Başarıyla Güncellendi","BAŞARILI")
      }
    },errResponse=>{
      this.toastrService.error(errResponse)
    })
  }

  getImage(){
    this.restaurantImageService.getImagesByRestaurantId(this.restaurantId).subscribe(response=>{
      this.imageId=response.data[0].id    
    })
  }

  onChange(event:any) {
    this.file = event.target?.files[0];
  }


}
