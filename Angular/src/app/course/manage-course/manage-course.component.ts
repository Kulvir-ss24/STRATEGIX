import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminServicesService } from 'src/app/services/admin/admin-services.service';
import { AuthServcieService } from 'src/app/services/auth/auth-servcie.service';

@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.css']
})
export class ManageCourseComponent {

  data:any = []
  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private adminService: AdminServicesService, private authServ: AuthServcieService) { }

  ngOnInit(): void {
    this.getCourses()
  }

  getCourses(){
    this.spinner.show()
    this.adminService.allCourses({}).subscribe({
      next: (v:any) => {
        this.spinner.hide()
        if (v.success){
          this.data = v.data
        }
      }
    })
  }

  changeStatus(id:any, status:any){
    this.spinner.show()
    this.adminService.chngStatusCourses({ _id: id, status: status }).subscribe({
      next: (v:any) => {
        this.spinner.hide()
        if (v.success){
          this.getCourses()
        }
      }
    })
  }
}
