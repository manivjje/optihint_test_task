import React from 'react';

export default function CreateTodoForm() {
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input type="text" placeholder="Name of new task" />
      <button type="submit">Create</button>
    </form>
  );
}
