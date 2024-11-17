import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthServcieService } from 'src/app/services/auth/auth-servcie.service';
import { UserServicesService } from 'src/app/services/user/user-services.service';

@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.css']
})
export class ViewCoursesComponent {
  data:any = []
  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private userService:UserServicesService, private authServ: AuthServcieService) { }

  ngOnInit(): void {
    this.getCourses()
  }

  getCourses(){
    this.spinner.show()
    this.userService.allCourses({status:true}).subscribe({
      next: (v:any) => {
        this.spinner.hide()
        if (v.success){
          this.data = v.data
          // console.log(this.data);

        }
      }
    })
  }
}
