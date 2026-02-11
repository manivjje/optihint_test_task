import { Todo } from '@/types';
import api from '../client';

export async function deleteTodo(todoId: Todo['id']) {
  return await api.delete(todoId);
}
