import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminServicesService } from 'src/app/services/admin/admin-services.service';
import { AuthServcieService } from 'src/app/services/auth/auth-servcie.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  data:any = []
  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private adminService: AdminServicesService, private authServ: AuthServcieService) { }

  ngOnInit(): void {
    this.getStudents()
  }

  getStudents(){
    this.spinner.show()
    this.adminService.getStudents({}).subscribe({
      next: (v:any) => {
        this.spinner.hide()
        if (v.success){
          this.data = v.data
          // console.log(this.data);

        }
      }
    })
  }

  changeStatus(id:any, status:any){
    this.spinner.show()
    this.adminService.changeStudStatus({ _id: id, status: status }).subscribe({
      next: (v:any) => {
        this.spinner.hide()
        if (v.success){
          this.getStudents()
        }
      }
    })
  }
}
