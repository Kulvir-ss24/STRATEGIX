import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthServcieService } from 'src/app/services/auth/auth-servcie.service';
import { UserServicesService } from 'src/app/services/user/user-services.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  course:any[]=[]
  branch:any[]=[]
  registerForm :FormGroup= new FormGroup({
    name: new FormControl('', Validators.required),
    rollNo: new FormControl('', Validators.required),
    contact: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    courseId: new FormControl('', Validators.required),
    branchId: new FormControl(''),
  })

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private userService: UserServicesService, private authServ: AuthServcieService, private router: Router) { }

  ngOnInit(){
    this.getCourses()
  }

  getCourses(){
    this.userService.allCourses({}).subscribe({
      next: (v:any) => {
        if (v.success){
          this.course = v.data
        }
      }
    })
  }

  getBranch(courseId:any){
    this.userService.allBranch({ courseId: courseId.target.value }).subscribe({
      next: (v:any) => {
        if (v.success){
          this.branch = v.data
          console.log(this.branch.length>0);

          if(this.branch.length>0)
            this.registerForm.controls["branchId"].setValidators(Validators.required);
          else
            this.registerForm.controls["branchId"].clearValidators();
        }
      }
    })
  }

  submit(){
    if(this.branch.length==0)
      this.registerForm.removeControl('branchId')
    this.spinner.show()
    this.userService.register(this.registerForm.value).subscribe({
      next: (v:any) => {
        this.spinner.hide()
        if (v.success){
          this.toastr.success(v.message, 'Success')
          this.router.navigateByUrl('/login')
        }
        else{
          this.toastr.error(v.message, 'ERror')
        }
      }
    })
  }

}
