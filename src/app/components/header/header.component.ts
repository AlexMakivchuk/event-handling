import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageModel } from '../../shared/models/message';
import { MessageComponent } from '../message/message.component';
import { MessageService } from '../../shared/services/message.service';
import { Subject } from 'rxjs';
import { delay, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  showMessage: boolean;
  outputMessage: MessageModel;
  constructor(private messageService: MessageService) {
  }

  openDialog(message: MessageModel): void {
    this.showMessage = true;
    this.outputMessage = message;
  }

  ngOnInit(): void {
    this.messageService.getMessage().pipe(
      takeUntil(this.unsubscribe$),
      tap(message => message.text ? this.openDialog(message) : null),
      delay(5000),
      tap(() => this.showMessage = false)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

}
