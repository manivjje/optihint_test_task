import { Todo } from '@/types';
import api from '../client';

export async function fetchTodos(): Promise<Todo[]> {
  return await api.get();
}
