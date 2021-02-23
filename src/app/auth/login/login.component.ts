import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../shared/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  item$: Observable<any[]>;
  constructor(
    private firestore: AngularFirestore,
    public auth: AngularFireAuth,
    private messageService: MessageService
  ) {
    this.item$ = firestore.collection('users').valueChanges();
    this.buildForm();
  }

  ngOnInit(): void {
    this.item$.subscribe(console.log);
  }

  login(): void {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(value => console.log(value)).catch(console.log);
  }

  logout(): void {
    this.auth.signOut().then(console.log).catch(console.log);
  }

  buildForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email] ),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  click(): void {
    this.messageService.setMessage({ type: 'danger', text: 'error'});
  }
}
