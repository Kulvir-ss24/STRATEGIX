import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminServicesService } from 'src/app/services/admin/admin-services.service';
import { AuthServcieService } from 'src/app/services/auth/auth-servcie.service';

@Component({
  selector: 'app-manage-branch',
  templateUrl: './manage-branch.component.html',
  styleUrls: ['./manage-branch.component.css']
})
export class ManageBranchComponent {
  data:any = []
  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private adminService: AdminServicesService, private authServ: AuthServcieService) { }

  ngOnInit(): void {
    this.getBranches()
  }

  getBranches(){
    this.spinner.show()
    this.adminService.allBranch({}).subscribe({
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
    this.adminService.chngStatusBranch({ _id: id, status: status }).subscribe({
      next: (v:any) => {
        this.spinner.hide()
        if (v.success){
          this.getBranches()
        }
      }
    })
  }
}
