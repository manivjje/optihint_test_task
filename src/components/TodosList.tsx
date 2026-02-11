import { Todo } from '@/types';
import TodoListItem from '@/components/TodoListItem';

interface TodoListProps {
  todos: Array<Todo>;
  onDelete: (id: Todo['id']) => void;
  onComplete: (id: Todo['id'], isComplete: Todo['completed']) => void;
}

export default function TodoList({ todos, onDelete, onComplete }: TodoListProps) {
  return (
    <ul className="w-full">
      {todos.map((todo) => {
        return (
          <li className="mb-2 last:mb-0" key={todo.id}>
            <TodoListItem todo={todo} onDelete={onDelete} onComplete={onComplete} />
          </li>
        );
      })}
    </ul>
  );
}
