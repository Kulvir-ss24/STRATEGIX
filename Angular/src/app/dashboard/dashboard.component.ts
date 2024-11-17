import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminServicesService } from '../services/admin/admin-services.service';
import { AuthServcieService } from '../services/auth/auth-servcie.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  totalCourses = 0
  totalStudents = 0
  totalNotes = 0
  totalQuestionPapers = 0
  totalLabFiles = 0
  totalQuizes = 0
  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private adminService: AdminServicesService, private authServ: AuthServcieService) { }


  ngOnInit(){
    this.getDashboard()
  }

  getDashboard(){
    this.spinner.show()
    this.adminService.getDashboard().subscribe({
      next: (v:any) => {
        this.spinner.hide()
        if (v.success){
          this.totalCourses = v.totalCourses
          this.totalStudents = v.totalStudents
          this.totalNotes = v.totalNotes
          this.totalQuestionPapers = v.totalQuestionPapers
          this.totalLabFiles = v.totalLabFiles
          this.totalQuizes = v.totalQuizes
        }
      }
    })
  }
}
