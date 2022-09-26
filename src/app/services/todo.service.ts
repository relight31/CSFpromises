import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Subject, tap } from 'rxjs';
import { Todo } from '../components/models';

// @Injectable({providedIn:'root'}) but need to find every module
@Injectable()
export class TodoService {
  // not a UI element so does not work with @Output

  onNewData = new Subject<Todo[]>();

  constructor(private http: HttpClient) {}
  getTodo(userId: number): Promise<Todo[]> {
    const params = new HttpParams().set('userId', userId);
    return firstValueFrom(
      this.http
        .get<Todo[]>('https://jsonplaceholder.typicode.com/todos', {
          params,
        })
        .pipe(
          tap((data) => {
            console.log('in tap');
            this.onNewData.next(data);
          })
          // tap() does something with your data (without changing it)
        )
    );
  }
}
