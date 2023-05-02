import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  password:string
  verifyPassword:string;
  isChecked:boolean;
  constructor(private toastrService:ToastrService,private authService:AuthService, private formBuilder:FormBuilder,private router:Router,){}

  ngOnInit(): void {
    this.createRegisterForm();
  }
  createRegisterForm(){
    this.registerForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required],
      openingTime:["",Validators.required],
      categoryId:["",Validators.required],
      closingTime:["",Validators.required],
      minCartPrice:["",Validators.required],
      phoneNumber:["",Validators.required],
      restaurantAddress:["",Validators.required],
      restaurantName:["",Validators.required],
      taxNumber:["",Validators.required],
    })
  }

  register(){
    if (this.registerForm.valid) {
      let model = Object.assign({},this.registerForm.value);
      if (this.password==this.verifyPassword) {
        if (this.isChecked) {
          this.authService.register(model).subscribe(response=>{
            this.toastrService.info("Başvurunuz alınmıştır geri dönüş maili en yakın sürede gelecektir.")
            setTimeout(() => {
              this.router.navigate(["login"]);
            }, 2700)
          },errResponse=>{
            console.log(errResponse);
          })
        }else{
          this.toastrService.error("Lütfen bilgilendirme yazısını okuyup kabul ediniz.","HATA")
        }
      }else{
        this.toastrService.info("Şifreler Eşleşmiyor.")
      }
    }else{
      this.toastrService.info("Lütfen bilgilerinizi Doldurun","HATA")
    }
  }

  toggleEditable() {
    this.isChecked = !this.isChecked;
  }
}
