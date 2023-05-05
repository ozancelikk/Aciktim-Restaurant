import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuImageService } from 'src/app/services/menu/menu-image.service';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-menuadd',
  templateUrl: './menuadd.component.html',
  styleUrls: ['./menuadd.component.css']
})
export class MenuaddComponent implements OnInit {
  addMenuForm:FormGroup;
  restaurantId:any
  menuTitle:string
  images: any;
  menuId: string;
  file: File;

  constructor(private toastrService:ToastrService,private formBuilder:FormBuilder,private menuService:MenuService,private router:Router,private menuImageService:MenuImageService){}
  ngOnInit(): void {
    this.getRestaurantId();
    this.createMenuForm();
    
  }
  getRestaurantId(){
    this.restaurantId=localStorage.getItem("restaurantId")
  }

  createMenuForm(){
    this.addMenuForm=this.formBuilder.group({
      restaurantId:[this.restaurantId,Validators.required],
      menuTitle:["",Validators.required],
      menuDescription:["",Validators.required],
      menuPrice:["",Validators.required],
      menuProperties: this.formBuilder.array([]),
    })
  }

  addMenu(){
    let model = Object.assign({}, this.addMenuForm.value);
    console.log(model);
    if (this.addMenuForm.valid) {
        this.menuService.add(model).subscribe(response=>{
          if (response.success) {
            console.log(response);
            this.menuId=response.data
            if(this.file != null) {
              setTimeout(() => {
                let model2 = {
                  menuId:this.menuId,
                  image:this.file
                }
                this.menuImageService.addImage(model2).subscribe(response => {
                })
              }, 2000) 
            }
            this.toastrService.success("Menü Başarıyla eklendi")
            setTimeout(() =>{
              this.router.navigate(["/home"]);
            },500)
          }
        },errResponse=>{
          console.log(errResponse);
        })
    }
  }


  onChange(event:any) {
    this.file = event.target?.files[0];
  }

}
