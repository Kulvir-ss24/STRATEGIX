import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthServcieService } from 'src/app/services/auth/auth-servcie.service';
import { UserServicesService } from 'src/app/services/user/user-services.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  course:any[]=[]
  branch:any[]=[]
  studentData:any
  registerForm :FormGroup= new FormGroup({
    _id: new FormControl('', Validators.required),
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
    this.getUserDetail()
  }

  getUserDetail(){
    this.userService.getSingleStudent({_id:this.authServ.getUserId()}).subscribe({
      next: (v:any) => {
        if (v.success){
          this.studentData = v.data
          this.registerForm.patchValue({_id:this.studentData.userId._id})
          this.registerForm.patchValue({name:this.studentData.name})
          this.registerForm.patchValue({rollNo:this.studentData.rollNo})
          this.registerForm.patchValue({contact:this.studentData.contact})
          this.registerForm.patchValue({email:this.studentData.email})
          this.registerForm.patchValue({courseId:this.studentData.courseId._id})
          this.getBranch()
          this.registerForm.patchValue({branchId:this.studentData.branchId._id})
        }
      }
    })
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

  getBranch(){
    this.userService.allBranch({ courseId: this.registerForm.value.courseId}).subscribe({
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
      this.registerForm.patchValue({branchId:null})
    this.spinner.show()
    this.userService.updateStudents(this.registerForm.value).subscribe({
      next: (v:any) => {
        this.spinner.hide()
        if (v.success){
          this.toastr.success(v.message, 'Success')
        }
        else{
          this.toastr.error(v.message, 'ERror')
        }
      }
    })
  }

}
