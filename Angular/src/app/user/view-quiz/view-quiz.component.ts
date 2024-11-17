import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthServcieService } from 'src/app/services/auth/auth-servcie.service';
import { UserServicesService } from 'src/app/services/user/user-services.service';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.css']
})
export class ViewQuizComponent {
  imageUrl:any
  branchId:any
  quiz:any[] = []
  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private adminService: UserServicesService, private router: Router, private route: ActivatedRoute, @Inject('BASE_IMAGE_URL') _imageUrl:any, private authService:AuthServcieService) {
    this.imageUrl = _imageUrl
  }

  ngOnInit(): void {
    this.branchId = this.route.snapshot.paramMap.get('id')
    this.getQuiz()
  }

  getQuiz(){
    this.spinner.show()
    this.adminService.allQuiz({ branchId:this.branchId,status:true}).subscribe({
      next: (v:any) => {
        if (v.success){
          this.quiz = v.data
          // console.log(this.quiz);

        }
        this.spinner.hide()
      }
    })
  }
}

