import React, { type ChangeEvent, useState } from 'react';
import { CreateTodoDto } from '@/api/types';
import clsx from 'clsx';

interface CreateTodoFormProps {
  onCreate: (dto: CreateTodoDto) => void;
  className?: string;
}

export default function CreateTodoForm({ onCreate, className }: CreateTodoFormProps) {
  const [text, setText] = useState<string>('');

  const handleUpdateTextValue = (e: ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (text.trim()) {
      onCreate({ text });
      setText('');
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={clsx('flex max-[400px]:w-full gap-2 max-[400px]:flex-col', className)}
    >
      <input
        type="text"
        placeholder="Нове завдання"
        value={text}
        onChange={(event) => handleUpdateTextValue(event)}
        className="px-4 py-2 bg-blue-50 max-[400px]:w-full focus:outline-2 focus:outline-solid focus:outline-blue-300
          rounded-md"
      />
      <button
        type="submit"
        disabled={!text}
        className="bg-blue-200 max-[400px]:w-full disabled:text-gray-500 text-gray-900 px-4 py-2 rounded-md
          hover:bg-blue-300 active:opacity-80 transition-all duration-200"
      >
        Додати
      </button>
    </form>
  );
}
