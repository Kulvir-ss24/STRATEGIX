import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminServicesService } from 'src/app/services/admin/admin-services.service';
import { AuthServcieService } from 'src/app/services/auth/auth-servcie.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent {

  quizForm:FormGroup = new FormGroup({
    courseId: new FormControl('', Validators.required),
    branchId: new FormControl('', Validators.required),
    semester: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    totalQuestions: new FormControl('', Validators.required),
  })

  course:any = []
  branch:any = []
  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private adminService: AdminServicesService, private authServ: AuthServcieService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(){
    this.getCourses()
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
    this.spinner.show()
    this.adminService.addQuiz(this.quizForm.value).subscribe({
      next: (v:any) => {
        this.spinner.hide()
        if (v.success){
          this.toastr.success(v.message, 'Success')
          this.router.navigateByUrl('/admin/manage-quiz')
        }
        else{
          this.toastr.error(v.message, 'ERror')
        }
      }
    })
  }
}
