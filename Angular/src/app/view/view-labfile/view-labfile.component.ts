import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthServcieService } from 'src/app/services/auth/auth-servcie.service';
import { UserServicesService } from 'src/app/services/user/user-services.service';

@Component({
  selector: 'app-view-labfile',
  templateUrl: './view-labfile.component.html',
  styleUrls: ['./view-labfile.component.css']
})
export class ViewLabfileComponent {
  imageUrl:any
  labfile:any[] = []
  branchId:any
  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private adminService: UserServicesService, private router: Router, private route: ActivatedRoute, @Inject('BASE_IMAGE_URL') _imageUrl:any, private authService:AuthServcieService) {
    this.imageUrl = _imageUrl
  }

  ngOnInit(): void {
    this.branchId = this.route.snapshot.paramMap.get('id')
    this.getLabfiles()
  }

  openAttachment(path:any){
    window.open(this.imageUrl+path)
  }

  openLink(path:any){
    window.open(path)
  }

  getLabfiles(){
    this.spinner.show()
    this.adminService.allMaterial({materialType:"LABFILES", status:true, branchId:this.branchId}).subscribe({
      next: (v:any) => {
        if (v.success){
          this.labfile = v.data
          // console.log(this.labfile);

        }
        this.spinner.hide()
      }
    })
  }
}

