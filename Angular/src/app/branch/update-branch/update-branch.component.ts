import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminServicesService } from 'src/app/services/admin/admin-services.service';
import { AuthServcieService } from 'src/app/services/auth/auth-servcie.service';

@Component({
  selector: 'app-update-branch',
  templateUrl: './update-branch.component.html',
  styleUrls: ['./update-branch.component.css']
})
export class UpdateBranchComponent {
  courseForm = new FormGroup({
    name: new FormControl('', Validators.required),
    courseId: new FormControl('', Validators.required),
    _id: new FormControl('')
  })

  course:any
  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private adminService: AdminServicesService, private authServ: AuthServcieService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(){
    this.route.paramMap.subscribe(param => {
      this.getCourses()
      this.getSingleBranch(param.get('id'))
    })
  }

  getSingleBranch(id:any) {
    this.adminService.singleBranch({ _id: id }).subscribe({
      next: (v:any) => {
        if (v.success){
          this.courseForm.patchValue({ courseId: v.data.courseId._id, name: v.data.name, _id: v.data._id })
        }
      }
    })
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
    this.adminService.editBranch(this.courseForm.value).subscribe({
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
