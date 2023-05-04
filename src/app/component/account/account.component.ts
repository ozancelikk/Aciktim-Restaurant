import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
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
  mailAddress: string;
  constructor( private formBuilder:FormBuilder,private toastrService:ToastrService,private authservice:AuthService,private restaurantService:RestaurantService,private router:Router){}
  ngOnInit(): void {
    this.createchangePasswordForm();
  }

  createchangePasswordForm(){
    this.changePasswordForm=this.formBuilder.group({
      oldPassword: ["",Validators.required],
      newPassword: ["",Validators.required]
    });
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



}
