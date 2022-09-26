import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Todo } from './components/models';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private todoSvc: TodoService) {}
  title = 'promises';

  getData() {
    console.info('---- before call ----');
    /* lastValueFrom(
      //return last value of observable as promise
      this.httpClient
        .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
        .pipe() // returns observable
    )
      .then((data) => data.filter((v) => v.completed))
      .then((data) => {
        return data.slice(0, 8);
      })
      .then(this.processTodo)
      .catch((error) => {
        console.error('>>> error: ', error);
      }); */
    this.todoSvc
      .getTodo(2)
      .then((data) => data.filter((v) => v.completed))
      .then((data) => {
        return data.slice(0, 8);
      })
      .then(this.processTodo);
    console.info('---- after call ----');
  }

  // this is a way to chain functions together

  processTodo(todo: Todo[]) {
    console.info('>>> processing Todo');
    console.log(todo);
  }
}
