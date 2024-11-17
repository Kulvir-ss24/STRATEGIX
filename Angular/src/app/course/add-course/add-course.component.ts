import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminServicesService } from 'src/app/services/admin/admin-services.service';
import { AuthServcieService } from 'src/app/services/auth/auth-servcie.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
}) 
export class AddCourseComponent {

  courseForm = new FormGroup({
    name: new FormControl('', Validators.required),
    totalSemesters: new FormControl('', Validators.required),
  })

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private adminService: AdminServicesService, private authServ: AuthServcieService, private router: Router) { }

  submit(){
    this.spinner.show()
    this.adminService.addCourses(this.courseForm.value).subscribe({
      next: (v:any) => {
        this.spinner.hide()
        if (v.success){
          this.toastr.success(v.message, 'Success')
          this.router.navigateByUrl('/admin/manage-course')
        }
        else{
          this.toastr.error(v.message, 'ERror')
        }
      }
    })
  }

}
