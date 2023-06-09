import { Component } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

declare var $ :any
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  
  isStyleInvalid:any={'background-color':'gray','border-color':'gray'};
  isStylevalid:any={'background-color':'#17a2b8','border-color':'#17a2b8'};
  constructor( private _AuthService:AuthService , private _Router:Router){
   if(this._AuthService.isLoggedIn()){
    this._Router.navigate(['/profile'])
   }
    
  }
  logInForm=new FormGroup({
   email:new FormControl('',[Validators.email,Validators.required]),
   password:new FormControl('',Validators.required)
  }) 
  logIn(){
    if(this.logInForm.valid){
      console.log("valid signin form")
      console.log(this.logInForm.value)
      this._AuthService.signIn(this.logInForm.value).subscribe((responce)=>{
        console.log(responce)
       if(responce.message == 'success'){
        console.log("hello in profile")
          this._Router.navigate(['/profile'])
          console.log("dakhal")
          localStorage.setItem('token',responce.token)
          console.log("token",responce.token)
       }
       else{
        console.log(this.logInForm)

       }
      })
    }
  
  }
 ngOnInit(){
  $('#sigIn').particleground()
 }
}
