import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServcieService } from 'src/app/services/auth/auth-servcie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin:boolean = false

  constructor(private auth:AuthServcieService, private router:Router){}

  ngOnInit(): void {
    this.checkLogin()
  }
  checkLogin(){
    if(this.auth.getToken()!=null)
      this.isLogin = true
    else
      this.isLogin = false
  }

  logout(){
    this.auth.removeData()
    this.router.navigateByUrl("/login")
  }
}
