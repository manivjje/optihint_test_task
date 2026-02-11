import { Todo } from '@/types';
import TodoListItem from '@/components/TodoListItem';
import { UpdateTodoDto } from '@/api/types';

interface TodoListProps {
  todos: Array<Todo>;
  onDelete: (id: Todo['id']) => void;
  onUpdate: (data: UpdateTodoDto) => void;
}

export default function TodoList({ todos, onDelete, onUpdate }: TodoListProps) {
  return (
    <ul className="w-full">
      {todos.map((todo) => {
        return (
          <li className="mb-2 last:mb-0" key={todo.id}>
            <TodoListItem todo={todo} onDelete={onDelete} onUpdate={onUpdate} />
          </li>
        );
      })}
    </ul>
  );
}
