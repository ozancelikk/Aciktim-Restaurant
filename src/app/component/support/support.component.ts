import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RestaurantmailService } from 'src/app/services/restaurant/restaurantmail.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit{
  constructor(private toastrService:ToastrService, private restaurantMailService:RestaurantmailService, private formBuilder:FormBuilder){}
  form:FormGroup
  restaurantId:any
  ngOnInit(): void {
    this.getRestaurantId()
    this.createForm()
  }
  addMail(){
    let model = Object.assign({},this.form.value)
   if(this.form.valid){
      this.restaurantMailService.addMail(model).subscribe(response=>{
        response.success? this.toastrService.success("Mesajınız Başarıyla Gönderildi", "BAŞARILI") : this.toastrService.error("Bir Hata Meydana Geldi", "HATA")
      })
   }
   else{
    this.toastrService.error("Gerekli Alanları Doldurunuz", "HATA")
   }
  }
  createForm(){
    this.form = this.formBuilder.group({
      restaurantId:[this.restaurantId,Validators.required],
      subject:["",Validators.required],
      content:["",Validators.required],
      mail:["",Validators.required]
    })
  }
  getRestaurantId(){
    this.restaurantId = localStorage.getItem("restaurantId")

  }

}
