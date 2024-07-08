'use client';
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addTodo, getTodos } from '@/lib/features/todos/todoApi';
import TodoItem from '../TodoItem';
import { Todo } from '@/models/todos';

const TodoList: React.FC = () => {
  const queryClient = useQueryClient();
  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });
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
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading todos: {error.message}</p>;
  }

  return (
    <ul className="flex flex-wrap gap-4">
      {todos && todos.map((todo: Todo) => <TodoItem key={todo.id} {...todo} />)}
    </ul>
  );
};

export default TodoList;
