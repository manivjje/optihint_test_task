import { CreateTodoDto } from '../types';
import api from '../client';

export async function createTodo(dto: CreateTodoDto) {
  return await api.create(dto);
}
