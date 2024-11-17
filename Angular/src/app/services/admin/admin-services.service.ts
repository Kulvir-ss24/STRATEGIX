import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthServcieService } from '../auth/auth-servcie.service';

@Injectable({
  providedIn: 'root'
})
export class AdminServicesService {

  BaseURL : any
  token : any

  constructor(private http: HttpClient, @Inject('BASE_URL') _baseurl: any, private authservice : AuthServcieService) {
    this.BaseURL = _baseurl
    this.token = sessionStorage.getItem('token')
    // console.log(this.token)
  }

  login(form: any){
    // console.log(this.BaseURL)
    return this.http.post(this.BaseURL+"user/login", form)
  }

  getStudents(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"student/all",data,{headers:header_object})
  }

  changeStudStatus(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"student/changeStatus",data,{headers:header_object})
  }

  allCourses(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"course/all",data,{headers:header_object})
  }

  singleCourses(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"course/single",data,{headers:header_object})
  }

  addCourses(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"course/add",data,{headers:header_object})
  }

  editCourses(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"course/update",data,{headers:header_object})
  }

  chngStatusCourses(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"course/changeStatus",data,{headers:header_object})
  }

  allBranch(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"branch/all",data,{headers:header_object})
  }

  singleBranch(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"branch/single",data,{headers:header_object})
  }

  addBranch(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"branch/add",data,{headers:header_object})
  }

  editBranch(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"branch/update",data,{headers:header_object})
  }

  chngStatusBranch(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"branch/changeStatus",data,{headers:header_object})
  }

  allMaterial(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"material/all",data,{headers:header_object})
  }

  addMaterial(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"material/add",data,{headers:header_object})
  }

  singleMaterial(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"material/single",data,{headers:header_object})
  }

  editMaterial(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"material/update",data,{headers:header_object})
  }

  chngStatusMaterial(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"material/changeStatus",data,{headers:header_object})
  }

  allQuiz(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"quiz/all",data,{headers:header_object})
  }

  addQuiz(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"quiz/add",data,{headers:header_object})
  }

  singleQuiz(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"quiz/single",data,{headers:header_object})
  }

  editQuiz(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"quiz/update",data,{headers:header_object})
  }

  delQuiz(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"quiz/changeStatus",data,{headers:header_object})
  }

  allQuizQues(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"question/all",data,{headers:header_object})
  }

  addQuizQues(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"question/add",data,{headers:header_object})
  }

  singleQuizQues(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"question/single",data,{headers:header_object})
  }

  editQuizQues(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"question/update",data,{headers:header_object})
  }

  delQuizQues(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"question/delete",data,{headers:header_object})
  }
  allSubmission(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"submission/all",data,{headers:header_object})
  }

  editSubmission(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"submission/update",data,{headers:header_object})
  }

  getDashboard(){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.get(this.BaseURL+"dashboard",{headers:header_object})
  }
}
