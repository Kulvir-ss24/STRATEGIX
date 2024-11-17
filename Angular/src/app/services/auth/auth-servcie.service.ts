import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServcieService {

  constructor() { }

  setData(data:any){
    sessionStorage.setItem('userType', data.data.userType)
    sessionStorage.setItem('token', data.token)
    sessionStorage.setItem('_id', data.data._id)
  }

  getToken(){
    return sessionStorage.getItem('token')
  }

  getUserId(){
    return sessionStorage.getItem('_id')
  }

  removeData(){
    sessionStorage.clear()
  }
}
