import { Todo } from '@/types';
import TodoListItem from '@/components/TodoListItem';

interface TodoListProps {
  todoList: Array<Todo>;
}

export default function TodoList({ todoList }: TodoListProps) {
  return (
    <ul>
      {todoList.map((todo) => {
        return <TodoListItem todo={todo} />;
      })}
    </ul>
  );
}
