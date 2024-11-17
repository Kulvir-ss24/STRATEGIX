import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminServicesService } from '../services/admin/admin-services.service';
import { AuthServcieService } from '../services/auth/auth-servcie.service';
import { Router } from '@angular/router';
import { UserServicesService } from '../services/user/user-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    'email': new FormControl('', [Validators.email, Validators.required]),
    'password': new FormControl('', Validators.required),

  })
  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private userService: UserServicesService, private authServ: AuthServcieService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    // console.log(this.loginForm)
    this.spinner.show()
    this.userService.login(this.loginForm.value).subscribe({
      next: (v: any) => {
        this.spinner.hide()
        if (v.success) {
          this.authServ.setData(v)
          this.toastr.success(v.message, 'Success')
          this.router.navigateByUrl('/user/home')
        } else {
          this.toastr.error(v.message, 'Error')
        }
      }
    })
  }
}
