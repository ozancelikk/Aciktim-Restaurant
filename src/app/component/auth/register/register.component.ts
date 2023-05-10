import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category/category';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { RestaurantImageService } from 'src/app/services/restaurant/restaurant-image.service';

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
  images: any;
  restaurantId:any;
  category:Category[];
  file: File;
  constructor(private toastrService:ToastrService,private authService:AuthService, private formBuilder:FormBuilder,private router:Router,private restaurantImageService:RestaurantImageService,private categoryService:CategoryService){}

  ngOnInit(): void {
    this.createRegisterForm();
    this.categoryGetAll();
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
      registerDate:[new Date().toLocaleDateString(),Validators.required],
    })
  }

  register(){
    let model = Object.assign({},this.registerForm.value);
    console.log(model);
    
    if (this.registerForm.valid) {
      if (this.password==this.verifyPassword) {
        if (this.isChecked) {
          this.authService.register(model).subscribe(response=>{
            this.restaurantId=response.data;
            console.log(response.data);
            
            if (this.file!=null) {
              setTimeout(() => {
                let model2={
                  restaurantId:response.data.restaurantId,
                  image:this.file
                }
                this.restaurantImageService.addImage(model2).subscribe(response=>{
                });
              }, 2000);
            }
            this.toastrService.info("Başvurunuz alınmıştır geri dönüş maili en yakın sürede gelecektir.")
            setTimeout(() => {
              this.router.navigate(["login"]);
            }, 2700)
          },errResponse=>{
            this.toastrService.error(errResponse.error)
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

  onChange(event:any) {
    this.file = event.target?.files[0];
  }
  categoryGetAll(){
    this.categoryService.getAll().subscribe(response=>{
      response.success ? this.category=response.data : this.toastrService.error("Bir Hata Meydana Geldi");
    })
  }
}
