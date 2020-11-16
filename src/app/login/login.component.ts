import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
    this.auth.getRedirectResult().then(result => {
      if(result.user !== undefined)
      {
        this.router.navigate(['page-one']);
      }
    })
  }

  login(){
    const {email, password} = this.loginForm.value;
    this.auth.signInWithEmailAndPassword(email, password).then(() => this.router.navigate(['page-one']));

  }

  googleLogin(){

    return new Promise<any>((resolve, reject) =>{
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      this.auth.signInWithPopup(provider).then(res => {
        resolve(resolve);
        console.log(res);
        this.router.navigate(['page-one']);
      }, err=> {
        console.log(err);
        reject(err);
      })
    });
  }

  facebookLogin(){

    return new Promise<any>((resolve, reject) =>{
      let provider = new firebase.auth.FacebookAuthProvider();
      this.auth.signInWithPopup(provider).then(res => {
        resolve(resolve);
        this.router.navigate(['page-one']);
      }, err=> {
        console.log(err);
        reject(err);
      })
    });
  }

}
