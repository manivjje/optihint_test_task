import { Todo } from '@/types';
import api from '../client';
import { UpdateTodoDto } from '../types';

export async function updateTodo(dto: UpdateTodoDto): Promise<Todo> {
  return api.update(dto);
}
