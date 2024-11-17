import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminServicesService } from 'src/app/services/admin/admin-services.service';
import { AuthServcieService } from 'src/app/services/auth/auth-servcie.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent {
  quizId:any
  quizForm:FormGroup= new FormGroup({
    _id: new FormControl('', Validators.required),
    courseId: new FormControl('', Validators.required),
    branchId: new FormControl(''),
    semester: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    totalQuestions: new FormControl('', Validators.required),
  })

  course:any = []
  branch:any = []
  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private adminService: AdminServicesService, private authServ: AuthServcieService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(){
    this.quizId = this.route.snapshot.paramMap.get('id')
    this.getCourses()
    this.getSingleQuiz(this.quizId)
  }

  getSingleQuiz(id:any){
    this.adminService.singleQuiz({ _id: id }).subscribe({
      next: (v:any) => {
        if (v.success){
          // console.log(v);
          this.quizForm.patchValue({_id:this.quizId})
          this.quizForm.patchValue({ courseId: v.data.courseId._id,  semester: v.data.semester, title: v.data.title, description: v.data.description, totalQuestions: v.data.totalQuestions})
          this.getBranch()
          this.quizForm.patchValue({branchId: v.data.branchId._id})
        }
      }
    })
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

  getBranch(){
    this.adminService.allBranch({ courseId: this.quizForm.value.courseId }).subscribe({
      next: (v:any) => {
        if (v.success){
          this.branch = v.data
          // console.log(this.branch);

        }
      }
    })
  }


  submit(){
    if(this.quizForm.valid){
      if(this.branch.length==0)
        this.quizForm.patchValue({'branchId':null})
      // console.log(this.quizForm.value);

      this.spinner.show()
      this.adminService.editQuiz(this.quizForm.value).subscribe({
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
    else{
      this.toastr.error("Fill Form")
    }
  }
}

