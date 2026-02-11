import { Todo } from '@/types';
import api from '../client';
import { UpdateTodoDto } from '../types';

export async function update(dto: UpdateTodoDto): Promise<Todo> {
  return api.update(dto);
}
