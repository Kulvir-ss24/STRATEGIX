import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthServcieService } from 'src/app/services/auth/auth-servcie.service';
import { UserServicesService } from 'src/app/services/user/user-services.service';

@Component({
  selector: 'app-user-quiz',
  templateUrl: './user-quiz.component.html',
  styleUrls: ['./user-quiz.component.css']
})
export class UserQuizComponent {
  quizId:any
  quizSubmission:any[] = []
  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private userService: UserServicesService, private authServ: AuthServcieService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    this.quizId = this.activatedRoute.snapshot.paramMap.get('id')
    this.getQuizSubmission()
  }


  getQuizSubmission(){
    this.userService.allSubmission({userId:this.authServ.getUserId(), status:true}).subscribe({
      next: (v:any) => {
        if (v.success){
          this.quizSubmission = v.data
          // console.log(this.quizSubmission);

        }
      }
    })
  }
}
