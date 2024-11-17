import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminServicesService } from 'src/app/services/admin/admin-services.service';
import { AuthServcieService } from 'src/app/services/auth/auth-servcie.service';

@Component({
  selector: 'app-manage-quiz-ques',
  templateUrl: './manage-quiz-ques.component.html',
  styleUrls: ['./manage-quiz-ques.component.css']
})
export class ManageQuizQuesComponent {

  quizId:any
  total:any
  quizQues:any[] = []
  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private adminService: AdminServicesService, private authServ: AuthServcieService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    this.quizId = this.activatedRoute.snapshot.paramMap.get('id')
    this.total = this.activatedRoute.snapshot.paramMap.get('total')
    this.getQuizQues()
  }


  getQuizQues(){
    this.adminService.allQuizQues({quizId:this.quizId}).subscribe({
      next: (v:any) => {
        if (v.success){
          this.quizQues = v.data
          // console.log(this.quizQues);

        }
      }
    })
  }

  delete(id:any){
    this.spinner.show()
    this.adminService.delQuizQues({ _id: id}).subscribe({
      next: (v:any) => {
        this.spinner.hide()
        if (v.success){
          this.getQuizQues()
          this.toastr.success(v.message,"Success")
        }
      }
    })
  }

}
