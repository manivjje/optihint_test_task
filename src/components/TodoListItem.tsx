import { Todo } from '@/types';
import clsx from 'clsx';

interface TodoListItemProps {
  todo: Todo;
  onDelete: (id: Todo['id']) => void;
  onComplete: (id: Todo['id'], isComplete: Todo['completed']) => void;
}

export default function TodoListItem({ todo, onDelete, onComplete }: TodoListItemProps) {
  return (
    <div
      className={clsx(
        'flex items-center w-full px-5 py-3 gap-3 rounded-xl',
        todo.completed ? 'bg-gray-100 ' : 'bg-blue-50',
      )}
    >
      <label htmlFor={`checkbox-${todo.id}`}>
        <span
          className={clsx(
            `w-4 h-4 border-2 relative border-solid border-gray-300 flex items-center justify-center after:content-['']
            after:block after:w-4 after:h-4 after:z-10`,
            todo.completed ? 'after:bg-gray-300' : '',
          )}
        ></span>
        <input
          className="hidden"
          type="checkbox"
          id={`checkbox-${todo.id}`}
          onChange={(e) => onComplete(todo.id, e.target.checked)}
          checked={todo.completed}
        />
      </label>
      <span className={clsx('mr-auto', todo.completed ? 'line-through' : '')}>{todo.text}</span>
      <button
        onClick={() => onDelete(todo.id)}
        className="bg-red-200 hover:bg-red-300 active:opacity-80 duration-200 transition-all px-2 rounded-md py-1.5
          text-sm"
      >
        Видалити
      </button>
    </div>
  );
}
