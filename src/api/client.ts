import type { Todo } from '@/types';
import type { CreateTodoDto, ApiErrorResponse, UpdateTodoDto } from './types';

class TodosApiClient {
  private storageKey: string;
  private serverError: ApiErrorResponse = { status: 500, message: 'something bad happens' };

  constructor(key: string) {
    this.storageKey = key;
  }

  async get(): Promise<Todo[]> {
    return new Promise((resolve, _reject) => {
      const response = this.getItem();
      if (response) {
        return resolve(response);
      }
    });
  }

  async create(dto: CreateTodoDto): Promise<Todo> {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: dto.text,
      completed: false,
      createdAt: new Date(Date.now()),
    };

    return new Promise((resolve, _reject) => {
      this.setItem(newTodo);
      return resolve(newTodo);
    });
  }

  async update(dto: UpdateTodoDto): Promise<Todo> {
    const todos = this.getItem();
    return new Promise((resolve, reject) => {
      if (todos) {
        const foundTodoId = todos.findIndex((item) => item.id === dto.id);
        if (todos[foundTodoId]) {
          const updatedTodo = { ...todos[foundTodoId], ...dto };
          todos[foundTodoId] = updatedTodo;
          this.setItem(todos, false);

          return resolve(updatedTodo);
        }
      }

      return reject({ status: 404, message: 'item not found' } as ApiErrorResponse);
    });
  }

  async delete(todoId: Todo['id']): Promise<{ id: Todo['id'] }> {
    const todos = this.getItem();
    return new Promise((resolve, reject) => {
      if (todos) {
        const newTodos = todos.filter((item) => item.id !== todoId);
        this.setItem(newTodos, false);

        return resolve({ id: todoId });
      }

      return reject(this.serverError);
    });
  }

  private getItem(): Todo[] | null {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  private setItem(data: Todo[] | Todo, safe: boolean = true): void {
    const currentData = this.getItem();
    const receivedData = Array.isArray(data) ? data : [data];

    if (currentData) {
      const saveData = safe ? [...currentData] : [];
      localStorage.setItem(this.storageKey, JSON.stringify([...saveData, ...receivedData]));
      return;
    }

    localStorage.setItem(this.storageKey, JSON.stringify(receivedData));
  }
}

export default new TodosApiClient('todos');
