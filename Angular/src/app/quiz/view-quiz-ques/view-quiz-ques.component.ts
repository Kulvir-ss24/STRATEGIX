import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminServicesService } from 'src/app/services/admin/admin-services.service';
import { AuthServcieService } from 'src/app/services/auth/auth-servcie.service';
import { UserServicesService } from 'src/app/services/user/user-services.service';

@Component({
  selector: 'app-view-quiz-ques',
  templateUrl: './view-quiz-ques.component.html',
  styleUrls: ['./view-quiz-ques.component.css']
})
export class ViewQuizQuesComponent {
  correctQuestions:number = 0;
  quizId:any
  quizQues:any[] = []
  quizAttempts:any[] = []
  quizSubmitForm = new FormGroup({
    quizId: new FormControl('', [Validators.required]),
    userId: new FormControl('', [Validators.required]),
    totalQuestions: new FormControl(0, [Validators.required]),
    correctQuestions: new FormControl(0, [Validators.required]),
  })
  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private userService: UserServicesService, private authServ: AuthServcieService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    this.quizId = this.activatedRoute.snapshot.paramMap.get('id')
    this.getQuizQues()
    this.quizSubmitForm.patchValue({quizId:this.quizId})
    this.quizSubmitForm.patchValue({userId:this.authServ.getUserId()})
  }



  getQuizQues(){
    this.userService.allQuizQues({quizId:this.quizId}).subscribe({
      next: (v:any) => {
        if (v.success){
          this.quizQues = v.data
          console.log(this.quizQues);
          this.quizSubmitForm.patchValue({ totalQuestions: this.quizQues.length})
          console.log(this.quizSubmitForm.value.totalQuestions);
          
        }
      }
    })
  }

  selectOption(id:any, option:string, index:any){
    // console.log(id, option, index);

    if(this.quizQues[index].answer == option && this.correctQuestions < this.quizQues.length){
      let attemptIndex = this.quizAttempts.findIndex((obj)=>{
        return obj._id == id
      });
      if(attemptIndex == -1){
        this.quizAttempts.push({
          _id:id,
          answer:'correct'
        })
        if(this.correctQuestions < this.quizQues.length) this.correctQuestions += 1
      }
      else{
        this.quizAttempts.splice(attemptIndex,1)
        this.quizAttempts.push({
          _id:id,
          answer:'correct'
        })
        if(this.correctQuestions < this.quizQues.length) this.correctQuestions += 1
      }
      // console.log("Correct",this.quizAttempts);
      
    }
    else{
      let attemptIndex = this.quizAttempts.findIndex((obj)=>{
        return obj._id == id
      });
      // console.log("Attempt Index", attemptIndex);

      if(attemptIndex == -1){
        this.quizAttempts.push({
          _id:id,
          answer:'incorrect'
        })
        // if(this.correctQuestions > 0) this.correctQuestions -= 1
      }
      else{
        if(this.correctQuestions > 0 && this.quizAttempts[attemptIndex].answer == 'correct')
          this.correctQuestions -= 1
        this.quizAttempts.splice(attemptIndex,1)
        this.quizAttempts.push({
          _id:id,
          answer:'incorrect'
        })
        
      }
      // console.log("Incorrect",this.quizAttempts);
    }

    this.quizSubmitForm.patchValue({ correctQuestions: this.correctQuestions})
    console.log(this.quizQues[index].answer == option, "total",this.correctQuestions, this.quizAttempts)

  }


  submit(){
    // console.log(this.quizSubmitForm.value);

    if(this.quizSubmitForm.valid)
    {
      this.spinner.show()
      this.userService.addSubmission(this.quizSubmitForm.value).subscribe({
        next: (v:any) => {
          this.spinner.hide()
          if (v.success){
            this.toastr.success(v.message, 'Success')
            this.router.navigateByUrl('/user/user-quiz')
          }
          else{
            this.toastr.error(v.message, 'Error')
          }
        }
      })
    }
    else
      console.log(this.quizSubmitForm.value);
      
  }


}
