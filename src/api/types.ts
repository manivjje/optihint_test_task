import { Todo } from '@/types';

export interface ApiErrorResponse {
  status: number;
  message: string;
}

export interface CreateTodoDto {
  text: string;
}

export type UpdateTodoDto = Partial<Todo> & { id: Todo['id'] };
