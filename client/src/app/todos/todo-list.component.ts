import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Component({
    selector: 'app-todo-list-component',
    templateUrl: 'todo-list.component.html',
    styleUrls: ['./todo-list.component.scss'],
    providers: []
  })
export class TodoListComponent implements OnInit {
    public serverFilteredTodos: Todo[];
    public filteredTodos: Todo[];

    public todoStatus = '';
    public todoOwner: string;
    public todoCategory: string;
    public todoBody: string;
    public limitDisplayed: number;
    public pageNum = 1;
    public orderBy = '';


    constructor(private todoService: TodoService) {

    }

    getTodosFromServer() {
      this.todoService.getTodos(
        {status: this.todoStatus}
        ).subscribe(returnedTodos => {
        this.serverFilteredTodos = returnedTodos;
        this.updateFilter();
      }, err => {
        console.log(err);
      });
    }

    public updateFilter() {
      this.filteredTodos = this.todoService.filterTodos(
        this.serverFilteredTodos, {category: this.todoCategory, body: this.todoBody, owner: this.todoOwner, 
          limit: this.limitDisplayed, page: this.pageNum});
    }

    ngOnInit(): void {
      this.getTodosFromServer();
    }
}
