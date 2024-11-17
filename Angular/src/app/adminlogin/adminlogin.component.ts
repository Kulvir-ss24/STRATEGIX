import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminServicesService } from '../services/admin/admin-services.service';
import { Router } from '@angular/router';
import { AuthServcieService } from '../services/auth/auth-servcie.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent {
  loginForm = new FormGroup({
    'email': new FormControl('', [Validators.email, Validators.required]),
    'password': new FormControl('', Validators.required),

  })
  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private adminService: AdminServicesService, private authServ: AuthServcieService, private router: Router) { }

  ngOnInit(): void {
  }
  login() {
    // console.log(this.loginForm)
    this.spinner.show()
    this.adminService.login(this.loginForm.value).subscribe({
      next: (v: any) => {
        this.spinner.hide()
        if (v.success) {
          this.authServ.setData(v)
          this.toastr.success(v.message, 'Success')
          this.router.navigateByUrl('/admin/dashboard')
          this.spinner.hide()
        } else {
          this.toastr.error(v.message, 'Error')
          this.spinner.hide()
        }

      }
    })
  }
}
