import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminServicesService } from 'src/app/services/admin/admin-services.service';
import { AuthServcieService } from 'src/app/services/auth/auth-servcie.service';

@Component({
  selector: 'app-manage-material',
  templateUrl: './manage-material.component.html',
  styleUrls: ['./manage-material.component.css']
})
export class ManageMaterialComponent implements OnInit {

  imageUrl:any
  material:any[] = []
  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private adminService: AdminServicesService, private router: Router, private route: ActivatedRoute, @Inject('BASE_IMAGE_URL') _imageUrl:any, private authService:AuthServcieService) {
    this.imageUrl = _imageUrl
  }

  ngOnInit(): void {
    this.getMaterials()
  }

  openAttachment(path:any){
    window.open(this.imageUrl+path)
  }

  openLink(path:any){
    window.open(path)
  }

  getMaterials(){
    this.spinner.show()
    this.adminService.allMaterial({userId:this.authService.getUserId()}).subscribe({
      next: (v:any) => {
        if (v.success){
          this.material = v.data
          // console.log(this.material);

        }
        this.spinner.hide()
      }
    })
  }

  // changeStatus(id:any, status:any){
  //   this.spinner.show()
  //   this.adminService.chngStatusMaterial({ _id: id, status: status }).subscribe({
  //     next: (v:any) => {
  //       this.spinner.hide()
  //       if (v.success){
  //         this.toastr.success(v.message,"Success")
  //         this.getMaterials()
  //       }
  //     }
  //   })
  // }


}
