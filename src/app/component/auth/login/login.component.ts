import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup
  constructor(private authservice:AuthService,private toastrService:ToastrService,private formBuilder:FormBuilder,private router:Router){}
  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      let model = Object.assign({},this.loginForm.value);
      this.authservice.login(model).subscribe(response=>{
        if (response.success) {
          localStorage.setItem("restaurantId",response.data.restaurantId);
          localStorage.setItem("token",response.data.token);
          localStorage.setItem("status",response.data.status.toString());
          this.toastrService.success("Giriş Başarılı","BAŞARILI");
          setTimeout(() => {
            this.router.navigate(["/home"])
          }
            , 500);
        }
      },errResponse=>{
        this.toastrService.error(errResponse.error)
      })
    }
    else{
      this.toastrService.info("Lütfen Bilgilerinizi Doldurunuz","HATA")
    }
  }

 

}
