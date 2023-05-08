import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  ngOnInit(): void {
    
  }
  constructor(private authService:AuthService,private router:Router,private toastrService:ToastrService){}
  logout(){
    this.authService.logout();
    localStorage.removeItem("status")
    this.router.navigate(["/login"]);
    this.toastrService.success("Başarıyla Çıkış Yapıldı","BAŞARILI")
  }
  isAuthenticated() {
    if(localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

}
