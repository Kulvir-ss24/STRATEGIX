import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthServcieService } from '../auth/auth-servcie.service';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

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

  register(data:any){
    return this.http.post(this.BaseURL + 'student/add', data)
  }

  getSingleStudent(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"student/single",data,{headers:header_object})
  }

  updateStudents(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"student/update",data,{headers:header_object})
  }


  allCourses(data:any){
    return this.http.post(this.BaseURL+"course/all",data)
  }


  allBranch(data:any){

    return this.http.post(this.BaseURL+"branch/all",data)
  }


  allMaterial(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"material/all",data,{headers:header_object})
  }

  addMaterial(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"material/add",data,{headers:header_object})
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

  singleQuiz(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"quiz/single",data,{headers:header_object})
  }

  allQuizQues(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"question/all",data,{headers:header_object})
  }

  allSubmission(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"submission/all",data,{headers:header_object})
  }

  addSubmission(data:any){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.post(this.BaseURL+"submission/add",data,{headers:header_object})
  }

  getDashboard(){
    var header_object = new HttpHeaders().set('Authorization',this.authservice.getToken() ?? '');
    return this.http.get(this.BaseURL+"dashboard",{headers:header_object})
  }
}
