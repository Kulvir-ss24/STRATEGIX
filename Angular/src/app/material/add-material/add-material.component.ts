import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminServicesService } from 'src/app/services/admin/admin-services.service';
import { AuthServcieService } from 'src/app/services/auth/auth-servcie.service';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})
export class AddMaterialComponent {

  materialForm:FormGroup = new FormGroup({
    userId:  new FormControl('', Validators.required),
    materialType: new FormControl('', Validators.required),
    courseId: new FormControl('', Validators.required),
    branchId: new FormControl('', Validators.required),
    semester: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    material_image: new FormControl('', Validators.required),
  })

  course:any = []
  branch:any = []
  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private adminService: AdminServicesService, private authServ: AuthServcieService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(){
    this.materialForm.patchValue({'userId':this.authServ.getUserId()})
    this.getCourses()
  }

  uploadFile(event:any){
    this.materialForm.patchValue({material_image:event.target.files[0]})
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

  getBranch(courseId:any){
    this.adminService.allBranch({ courseId: courseId.target.value }).subscribe({
      next: (v:any) => {
        if (v.success){
          this.branch = v.data
        }
      }
    })
  }


  submit(){
    console.log(this.materialForm.value);
    const form = new FormData()
    form.append('userId', this.materialForm.value.userId)
    form.append('materialType', this.materialForm.value.materialType)
    form.append('courseId', this.materialForm.value.courseId)
    form.append('branchId', this.materialForm.value.branchId)
    form.append('semester', this.materialForm.value.semester)
    form.append('title', this.materialForm.value.title)
    form.append('description', this.materialForm.value.description)
    form.append('url', this.materialForm.value.url)
    form.append('material_image', this.materialForm.value.material_image)


    this.spinner.show()
    this.adminService.addMaterial(form).subscribe({
      next: (v:any) => {
        this.spinner.hide()
        if (v.success){
          this.toastr.success(v.message, 'Success')
          this.router.navigateByUrl('/user/manage-material')
        }
        else{
          this.toastr.error(v.message, 'Error')
        }
      }
    })
  }
}
