import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {
  @Input() todo;
  @Output() todoChange = new EventEmitter();
  @Output() todoDelete = new EventEmitter();
  private http;
  private messageService;
  constructor(http: HttpClient, messageService: MessageService) {
    this.http = http;
    this.messageService = messageService;
  }
  onSave(todo) {
    if (todo.id) {
      this.http.patch('http://myapp.test/api/todos/' + todo.id, todo)
        .subscribe(
          suc => {
            this.messageService.add('Todo with id ' + todo.id + ' updated.');
          },
          err => {
            for (let [key, value] of Object.entries(err.error.errors)) {
              this.messageService.add(value);
            }
          }
        );

      return;
    }

    this.http.post('http://myapp.test/api/todos/', todo)
      .subscribe(
        suc => {
          this.todoChange.emit(suc);
          this.messageService.add('Successfully created new Todo.');
          this.todo = null;
        },
        err => {
          for (let [key, value] of Object.entries(err.error.errors)) {
            this.messageService.add(value);
          }
        }
      );
  }
  onDelete(todo) {
    this.http.delete('http://myapp.test/api/todos/' + todo.id)
      .subscribe(
        suc => {
          this.todoDelete.emit(todo);
          this.todo = null;
          this.messageService.add('Todo with id ' + todo.id + ' deleted.');
        },
        err => {
          for (let [key, value] of Object.entries(err.error.errors)) {
            this.messageService.add(value);
          }
        }
      );
  }

  ngOnInit() {
  }

}
