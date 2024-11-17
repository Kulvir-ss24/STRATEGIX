import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthServcieService } from 'src/app/services/auth/auth-servcie.service';
import { UserServicesService } from 'src/app/services/user/user-services.service';

@Component({
  selector: 'app-view-notes',
  templateUrl: './view-notes.component.html',
  styleUrls: ['./view-notes.component.css']
})
export class ViewNotesComponent {

  imageUrl:any
  material:any[] = []
  branchId:any
  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private adminService: UserServicesService, private router: Router, private route: ActivatedRoute, @Inject('BASE_IMAGE_URL') _imageUrl:any, private authService:AuthServcieService) {
    this.imageUrl = _imageUrl
  }

  ngOnInit(): void {
    this.branchId = this.route.snapshot.paramMap.get('id')
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
    this.adminService.allMaterial({materialType:"NOTES", status:true,branchId:this.branchId}).subscribe({
      next: (v:any) => {
        if (v.success){
          this.material = v.data
          // console.log(this.material);

        }
        this.spinner.hide()
      }
    })
  }
}
