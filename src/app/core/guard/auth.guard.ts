import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AppService } from "src/app/app.service";

import { AuthService } from "src/app/auth/auth.service";
import { TokenStorageService } from "src/app/auth/token-storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,private tokenStorage:TokenStorageService,private app:AppService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     if (this.authService.currentUserValue) {
      const userRole = this.authService.currentUserValue.role;
      if (route.data.role && route.data.role.indexOf(userRole) === -1) {
       this.logout();
        this.router.navigate(["/authentication/signin"]);
        return false;
      }
       return true;
     }

    this.router.navigate(["/authentication/signin"]);
    return false;
  }

  
  logout() {
   

    this.tokenStorage.signOut();
     this.app.SetName('');
       localStorage.removeItem("currentUser");
     this.router.navigate(['/authentication/signin']);
 
   }
}
