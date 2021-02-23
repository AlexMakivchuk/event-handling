import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  item$: Observable<any[]>;
  authError: object;
  constructor(
    private firestore: AngularFirestore,
    public auth: AngularFireAuth) {
    this.item$ = firestore.collection('users').valueChanges();
    this.buildForm();
  }

  ngOnInit(): void {
    this.item$.subscribe(console.log);
  }

  buildForm(): void {
    this.form = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email] ),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      acceptpass: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  click(): void {
    console.log(this.form);
  }

}
