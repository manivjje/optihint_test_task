import { UpdateTodoDto } from '@/api/types';
import { Todo } from '@/types';
import clsx from 'clsx';
import { useRef, useState } from 'react';

interface TodoListItemProps {
  todo: Todo;
  onDelete: (id: Todo['id']) => void;
  onUpdate: (data: UpdateTodoDto) => void;
}

export default function TodoListItem({ todo, onDelete, onUpdate }: TodoListItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [todoText, setTodoText] = useState<string>(todo.text);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleMakeTextEditable = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const handleEditText = (e?: React.SyntheticEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (todoText.trim()) {
      onUpdate({ id: todo.id, text: todoText });
    }

    setIsEditing(false);
  };

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
          onChange={(e) => onUpdate({ id: todo.id, completed: !todo.completed })}
          checked={todo.completed}
        />
      </label>
      {!isEditing && (
        <span onDoubleClick={handleMakeTextEditable} className={clsx('mr-auto', todo.completed ? 'line-through' : '')}>
          {todo.text}
        </span>
      )}
      {isEditing && (
        <form onSubmit={(e) => handleEditText(e)} className="mr-auto">
          <input
            ref={inputRef}
            type="text"
            className="rounded-md focus:outline-2 focus:outline-solid focus:outline-blue-300 px-2 py-1"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            onBlur={() => handleEditText()}
            placeholder={todo.text}
          />
        </form>
      )}
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
