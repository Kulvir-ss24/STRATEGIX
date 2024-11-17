import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminServicesService } from 'src/app/services/admin/admin-services.service';
import { AuthServcieService } from 'src/app/services/auth/auth-servcie.service';

@Component({
  selector: 'app-update-quiz-ques',
  templateUrl: './update-quiz-ques.component.html',
  styleUrls: ['./update-quiz-ques.component.css']
})
export class UpdateQuizQuesComponent {
  quizQuesId:any
  quizQuesData:any
  quizQuesForm:FormGroup = new FormGroup({
    _id: new FormControl('', Validators.required),
    questionNo: new FormControl('', Validators.required),
    question: new FormControl('', Validators.required),
    option1: new FormControl('', Validators.required),
    option2: new FormControl('', Validators.required),
    option3: new FormControl('', Validators.required),
    option4: new FormControl('', Validators.required),
    answer: new FormControl('', Validators.required),
  })

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private adminService: AdminServicesService, private authServ: AuthServcieService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    this.quizQuesId = this.activatedRoute.snapshot.paramMap.get('id')
    this.quizQuesForm.patchValue({_id:this.quizQuesId})
    this.getSingleQuizQues()
  }


  getSingleQuizQues(){
    this.adminService.singleQuizQues({_id:this.quizQuesId,}).subscribe({
      next: (v:any) => {
        if (v.success){
          this.quizQuesData = v.data
          this.quizQuesForm.patchValue({questionNo:this.quizQuesData.questionNo})
          this.quizQuesForm.patchValue({question:this.quizQuesData.question})
          this.quizQuesForm.patchValue({option1:this.quizQuesData.option1})
          this.quizQuesForm.patchValue({option2:this.quizQuesData.option2})
          this.quizQuesForm.patchValue({option3:this.quizQuesData.option3})
          this.quizQuesForm.patchValue({option4:this.quizQuesData.option4})
          this.quizQuesForm.patchValue({answer:this.quizQuesData.answer})
        }
      }
    })
  }

  submit(){
    // console.log(this.quizQuesForm.value);

    this.spinner.show()
    this.adminService.editQuizQues(this.quizQuesForm.value).subscribe({
      next: (v:any) => {
        this.spinner.hide()
        if (v.success){
          this.toastr.success(v.message, 'Success')
          this.router.navigate(["/admin/manage-quiz-ques",this.quizQuesData.quizId._id])
        }
        else{
          this.toastr.error(v.message, 'ERror')
        }
      }
    })
  }
}

