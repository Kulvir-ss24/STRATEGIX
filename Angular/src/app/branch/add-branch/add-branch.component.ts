import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminServicesService } from 'src/app/services/admin/admin-services.service';
import { AuthServcieService } from 'src/app/services/auth/auth-servcie.service';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css']
})
export class AddBranchComponent {
  courseForm = new FormGroup({
    name: new FormControl('', Validators.required),
    courseId: new FormControl('', Validators.required),
  })

  course:any
  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private adminService: AdminServicesService, private authServ: AuthServcieService, private router: Router) { }

  ngOnInit(){
    this.getCourses()
  }

  getCourses(){
    this.adminService.allCourses({}).subscribe({
      next: (v:any) => {
        if (v.success){
          this.course = v.data
        }
      }
    })
  }

  submit(){
    this.spinner.show()
    this.adminService.addBranch(this.courseForm.value).subscribe({
      next: (v:any) => {
        this.spinner.hide()
        if (v.success){
          this.toastr.success(v.message, 'Success')
          this.router.navigateByUrl('/admin/manage-branch')
        }
        else{
          this.toastr.error(v.message, 'ERror')
        }
      }
    })
  }

}
