import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import {AngularFireAuth} from  '@angular/fire/auth';
import {Router, RouterLinkWithHref} from '@angular/router';
import {auth} from 'firebase/app';
import 'firebase/auth';
import { switchMap, first, mapTo, take} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  registerForm: FormGroup;
  constructor(private fb:FormBuilder, private aut: AngularFireAuth , private router: Router) { }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required,Validators.minLength(6)])
    });
  }

  createUser(){
    const {email,password} = this.registerForm.value;
    this.aut.createUserWithEmailAndPassword(email, password).then(user =>{
    console.log('RegistrationComponent -> createuser -> user', user)
    this.router.navigate(['/login']);
  });
    
  }


}
