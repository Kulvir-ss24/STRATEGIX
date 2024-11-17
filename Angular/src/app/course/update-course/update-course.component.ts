import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminServicesService } from 'src/app/services/admin/admin-services.service';
import { AuthServcieService } from 'src/app/services/auth/auth-servcie.service';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent {
  courseForm = new FormGroup({
    name: new FormControl('', Validators.required),
    totalSemesters: new FormControl('', Validators.required),
    _id: new FormControl('')
  })

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private adminService: AdminServicesService, private authServ: AuthServcieService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(){
    this.route.paramMap.subscribe(param => {
      this.courseForm.patchValue({ _id: param.get('id')})
      this.getSingleCourse(param.get('id'))
    })
  }


  getSingleCourse(id:any){
    this.adminService.singleCourses({ _id: id }).subscribe({
      next: (v:any) => {
        if (v.success){
          this.courseForm.patchValue({ name: v.data.name, totalSemesters: v.data.totalSemesters })
        }
      }
    })
  }

  submit(){
    this.spinner.show()
    this.adminService.editCourses(this.courseForm.value).subscribe({
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
