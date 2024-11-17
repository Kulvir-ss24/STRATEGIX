import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminServicesService } from 'src/app/services/admin/admin-services.service';
import { AuthServcieService } from 'src/app/services/auth/auth-servcie.service';

@Component({
  selector: 'app-quiz-submission',
  templateUrl: './quiz-submission.component.html',
  styleUrls: ['./quiz-submission.component.css']
})
export class QuizSubmissionComponent {
  quizId:any
  quizSubmission:any[] = []
  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private adminService: AdminServicesService, private authServ: AuthServcieService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    this.quizId = this.activatedRoute.snapshot.paramMap.get('id')
    this.getQuizSubmission()
  }


  getQuizSubmission(){
    this.adminService.allSubmission({quizId:this.quizId, status:true}).subscribe({
      next: (v:any) => {
        if (v.success){
          this.quizSubmission = v.data
          // console.log(this.quizSubmission);

        }
      }
    })
  }

  // changeStatus(id:any, status:any){
  //   this.spinner.show()
  //   this.adminService.delQuizSubmission({ _id: id, status: status }).subscribe({
  //     next: (v:any) => {
  //       this.spinner.hide()
  //       if (v.success){
  //         this.getQuizSubmission()
  //       }
  //     }
  //   })
  // }

}
