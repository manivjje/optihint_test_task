'use client';

import CreateTodoForm from '@/components/CreateTodoForm';
import TodoList from '@/components/TodosList';
import TodoCounter from '@/components/TodoCounter';
import { useEffect, useState } from 'react';
import { createTodo, deleteTodo, fetchTodos, updateTodo } from '@/api';
import { CreateTodoDto, UpdateTodoDto } from '@/api/types';
import { Todo } from '@/types';

export default function TodoContent() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [counter, setCounter] = useState<number>(0);

  const handleCreateTodo = async (dto: CreateTodoDto): Promise<void> => {
    const createdTodo = await createTodo(dto);
    setTodos([...todos, createdTodo]);
  };

  const handleUpdateTodo = async (dto: UpdateTodoDto): Promise<void> => {
    const todoIndex = todos.findIndex((item) => item.id === dto.id);
    if (todos[todoIndex]) {
      console.log('to update');
      const updatedTodo = await updateTodo(dto);
      const updatedTodos = [...todos];
      updatedTodos[todoIndex] = updatedTodo;
      setTodos(updatedTodos);
    }
  };

  const handleDeleteTodo = async (todoId: Todo['id']): Promise<void> => {
    await deleteTodo(todoId);
    setTodos(todos.filter((item) => item.id !== todoId));
  };

  useEffect(() => {
    fetchTodos().then((response) => {
      setTodos(response);
    });
  }, []);

  useEffect(() => {
    setCounter(todos.filter((item) => !item.completed).length);
  }, [todos]);

  return (
    <div className="flex flex-col items-center justify-center p-5 max-w-150 mx-auto">
      <h1 className="text-2xl font-bold mb-1 text-gray-800">Список завдань</h1>
      <TodoCounter counter={counter} className="mb-4" />

      <CreateTodoForm onCreate={handleCreateTodo} className="mb-4" />
      <TodoList
        todos={todos}
        onDelete={(id) => handleDeleteTodo(id)}
        onComplete={(id, completed) => handleUpdateTodo({ id, completed })}
      />
    </div>
  );
}
