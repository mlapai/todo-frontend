import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../message.service';
import {Todo} from '../todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  private http;
  private messageService;
  constructor(http: HttpClient, messageService: MessageService) {
    this.http = http;
    this.messageService = messageService;
  }
  todos: any;
  selectedTodo: any;
  onSelect(todo): void {
    this.selectedTodo = todo;
  }
  onCreate() {
    this.selectedTodo = new Todo();
  }
  pushInTodos(todo) {
    this.todos.push(todo);
  }
  deleteFromTodos(todo) {
    this.todos = this.todos.filter(function (obj) {
      return obj.id !== todo.id;
    });
  }
  getTodos() {
    this.http
      .get('http://myapp.test/api/todos')
      .subscribe((res) => this.todos = res, err => console.log(err));
    this.messageService.add('Fetched todos');
  }

  ngOnInit() {
    this.getTodos();
  }

}
