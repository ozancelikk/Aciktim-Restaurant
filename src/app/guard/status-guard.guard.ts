import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StatusGuardGuard implements CanActivate {
  constructor(private toastrService:ToastrService,private authService:AuthService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.isStatusTrue()) {
        return true
      }
      this.router.navigate(["/restaurantApplication"])
      this.toastrService.error("Restoran Başvurunuz Henüz Onaylanmamıştır!","HATA")
    return false;
  }
  
}
