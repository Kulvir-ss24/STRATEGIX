import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminServicesService } from 'src/app/services/admin/admin-services.service';
import { AuthServcieService } from 'src/app/services/auth/auth-servcie.service';

@Component({
  selector: 'app-add-quiz-ques',
  templateUrl: './add-quiz-ques.component.html',
  styleUrls: ['./add-quiz-ques.component.css']
})
export class AddQuizQuesComponent implements OnInit {

  quizId:any
  total:any
  quizQues:any[] =[]
  quizQuesForm:FormGroup = new FormGroup({
    quizId: new FormControl('', Validators.required),
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
    this.quizId = this.activatedRoute.snapshot.paramMap.get('id')
    this.getQuizQues()
    this.quizQuesForm.patchValue({quizId:this.quizId})

  }


  getQuizQues(){
    this.adminService.allQuizQues({quizId:this.quizId, status:true}).subscribe({
      next: (v:any) => {
        if (v.success){
          this.quizQues = v.data
          this.quizQuesForm.patchValue({questionNo:this.quizQues.length + 1})
        }
      }
    })
  }


  submit(){
    // console.log(this.quizQuesForm.value);

    this.spinner.show()
    this.adminService.addQuizQues(this.quizQuesForm.value).subscribe({
      next: (v:any) => {
        this.spinner.hide()
        if (v.success){
          this.toastr.success(v.message, 'Success')
          this.router.navigate(["/admin/manage-quiz-ques",this.quizId])
        }
        else{
          this.toastr.error(v.message, 'ERror')
        }
      }
    })
  }
}
