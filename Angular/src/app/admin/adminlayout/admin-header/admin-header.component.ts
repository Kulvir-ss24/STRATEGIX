import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServcieService } from 'src/app/services/auth/auth-servcie.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {

  constructor(private auth:AuthServcieService, private router:Router){}

  logout(){
    this.auth.removeData()
    this.router.navigateByUrl("/adminlogin")
  }
}
