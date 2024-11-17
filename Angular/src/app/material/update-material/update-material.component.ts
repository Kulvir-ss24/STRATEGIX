import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminServicesService } from 'src/app/services/admin/admin-services.service';
import { AuthServcieService } from 'src/app/services/auth/auth-servcie.service';

@Component({
  selector: 'app-update-material',
  templateUrl: './update-material.component.html',
  styleUrls: ['./update-material.component.css']
})
export class UpdateMaterialComponent {
  materialId:any
  materialData:any
  materialForm:FormGroup = new FormGroup({
    _id: new FormControl('', Validators.required),
    materialType: new FormControl('', Validators.required),
    courseId: new FormControl('', Validators.required),
    branchId: new FormControl('', Validators.required),
    semester: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    material_image: new FormControl(),
  })

  course:any = []
  branch:any = []
  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private adminService: AdminServicesService, private authServ: AuthServcieService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    this.getCourses()
    this.materialId = this.activatedRoute.snapshot.paramMap.get('id')
    this.getMaterial(this.materialId)
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


  getMaterial(id:any){
    this.adminService.singleMaterial({_id:id}).subscribe({
      next: (v:any) => {
        if (v.success){
          this.materialData = v.data
          // console.log("Material Data", this.materialData);

          this.materialForm.patchValue({_id:this.materialId})
          this.materialForm.patchValue({materialType:this.materialData.materialType})
          this.materialForm.patchValue({courseId:this.materialData.courseId._id})
          this.getBranch()
          this.materialForm.patchValue({semester:this.materialData.semester})
          this.materialForm.patchValue({title:this.materialData.title})
          this.materialForm.patchValue({description:this.materialData.description})
          this.materialForm.patchValue({branchId:this.materialData.branchId._id})
          this.materialForm.patchValue({url:this.materialData.url})
        }
      }
    })
  }

  getBranch(){
    this.adminService.allBranch({ courseId:  this.materialForm.value.courseId}).subscribe({
      next: (v:any) => {
        if (v.success){
          this.branch = v.data
        }
      }
    })
  }


  submit(){
    // console.log(this.materialForm.value);
    const form = new FormData()
    form.append('_id', this.materialForm.value._id)
    form.append('materialType', this.materialForm.value.materialType)
    form.append('courseId', this.materialForm.value.courseId)
    form.append('branchId', this.materialForm.value.branchId)
    form.append('semester', this.materialForm.value.semester)
    form.append('title', this.materialForm.value.title)
    form.append('description', this.materialForm.value.description)
    form.append('material_image', this.materialForm.value.material_image)

    this.spinner.show()
    this.adminService.editMaterial(form).subscribe({
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

