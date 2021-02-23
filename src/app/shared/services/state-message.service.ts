import { Injectable } from '@angular/core';
import { MessageModel } from '../models/message';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateMessageService {
  private state: MessageModel = {
    text: '',
    type: ''
  };
  private massage$ = new BehaviorSubject(this.state);

  isUpdating$(): Observable<MessageModel> {
    return this.massage$.asObservable();
  }

  setUpdating(isUpdating: MessageModel): void {
    this.massage$.next(isUpdating);
  }
}
