'use client';
import React, { useState } from 'react';
import styles from './TodoItem.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo } from '@/models/todos';
import { deleteTodo, updateTodo } from '@/lib/features/todos/todoApi';

interface TodoItemProps extends Todo {}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  title,
  content,
  complete,
}) => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);

  const deleteMutation = useMutation({
    mutationKey: ['todos'],
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const updateMutation = useMutation({
    mutationKey: ['todos'],
    mutationFn: updateTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const handleDelete = () => {
    deleteMutation.mutate(id);
  };

  const handleToggle = () => {
    updateMutation.mutate({ id, title, content, complete: !complete });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateMutation.mutate({
      id,
      title: editTitle,
      content: editContent,
      complete,
    });
    setIsEditing(false);
  };

  return (
    <div
      className={`${styles.itemContainer} p-4 border rounded mb-4 shadow-xl bg-[#effffa]`}
    >
      {isEditing ? (
        <div className="flex flex-col w-full">
          <input
            className="border p-1 rounded mb-1 w-full"
            value={editTitle}
            required
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            className="border p-1 rounded w-full mb-1"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <button
            className="bg-action text-white p-1 rounded shadow-md disabled:opacity-75 disabled:text-gray-500"
            onClick={handleSave}
            disabled={!editTitle}
          >
            Save
          </button>
        </div>
      ) : (
        <>
          <div className={`${complete ? 'line-through' : ''}`}>
            <h3 className="text-lg font-bold">{title}</h3>
            <p>{content}</p>
          </div>
          <div className="flex flex-col justify-end mt-2">
            <input
              className="p-4 h-10 shadow-md mb-4"
              type="checkbox"
              name="complete"
              id="complete"
              onChange={handleToggle}
              checked={complete}
            />

            <button
              className="bg-violet-800 text-white rounded h-8 shadow-md mb-4 w-20"
              onClick={handleEdit}
            >
              Edit
            </button>

            <button
              className="bg-red-600 text-white rounded h-8 shadow-md mb-4 w-20"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
