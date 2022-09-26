import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoService } from '../services/todo.service';
import { Todo } from './models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  sub$!: Subscription;
  // convention to put $ in name of subscription

  constructor(private todoSvc: TodoService) {}

  ngOnInit(): void {
    this.sub$ = this.todoSvc.onNewData.subscribe((data) => {
      console.info('Hello');
      this.processData(data);
    });
    // subscribe() returns a subscription
  }

  // $event object
  processData(data: Todo[]) {
    this.todos = data;
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
