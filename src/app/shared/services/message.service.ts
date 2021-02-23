import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageModel } from '../models/message';
import { StateMessageService } from './state-message.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private stateMessageService: StateMessageService) {
  }

  getMessage(): Observable<MessageModel> {
    return this.stateMessageService.isUpdating$();
  }

  setMessage(message: MessageModel): void {
    this.stateMessageService.setUpdating(message);
  }
}
