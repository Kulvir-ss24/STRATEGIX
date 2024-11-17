import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthServcieService } from 'src/app/services/auth/auth-servcie.service';
import { UserServicesService } from 'src/app/services/user/user-services.service';

@Component({
  selector: 'app-view-branch',
  templateUrl: './view-branch.component.html',
  styleUrls: ['./view-branch.component.css']
})
export class ViewBranchComponent { 
  courseId:any
  data:any = []
  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private userService:UserServicesService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('id')
    this.getBranches()

  }

  getBranches(){
    this.spinner.show()
    this.userService.allBranch({courseId:this.courseId, status:true}).subscribe({
      next: (v:any) => {
        this.spinner.hide()
        if (v.success){
          this.data = v.data
        }
      }
    })
  }
}
