'use client';
import React, { useState } from 'react';
import { addTodo } from '@/lib/features/todos/todoApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface TodoFormProps {
  /** Changes the Todo List view on successfully adding a new todo item  */
  returnToView: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ returnToView }) => {
  const queryClient = useQueryClient();

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const addMutation = useMutation({
    mutationKey: ['todos'],
    mutationFn: addTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const handleAddTodo = () => {
    addMutation.mutate({
      title: newTitle,
      content: newContent,
      complete: false,
    });
    setNewTitle('');
    setNewContent('');
    returnToView();
  };

  return (
    <form className="flex flex-col justify center items-center mt-6 mb-4 w-full">
      <div className="max-w-xl">
        <label htmlFor="todo-title">
          Enter a title: <span className="text-red-500">*</span>
        </label>

        <input
          id="todo-title"
          className="border p-1 w-full mb-4 rounded"
          placeholder="New Todo Title"
          value={newTitle}
          required={true}
          onChange={(e) => setNewTitle(e.target.value)}
        />

        <label htmlFor="todo-description">Enter a description:</label>

        <textarea
          id="todo-description"
          className="border p-1 w-full mb-4 rounded"
          placeholder="New Todo description"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
      </div>

      <button
        className="text-white rounded p-2 bg-action shadow-sm disabled:opacity-75 disabled:text-gray-500 max-w-xl"
        onClick={handleAddTodo}
        disabled={!newTitle}
      >
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
