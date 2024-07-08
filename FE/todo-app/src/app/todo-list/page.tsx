'use client';
import TabSwitcher from '@/components/TabSwitcher';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import { useState } from 'react';

const Tabs = ['View', 'Add New'];

export default function TodoListPage() {
  const [activeTab, setActiveTab] = useState('View');
  return (
    <main className="min-h-screen p-16">
      <h1 className="font-bold mb-4">Todo List</h1>

      <TabSwitcher
        tabs={Tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab === 'View' ? (
        <TodoList></TodoList>
      ) : (
        <TodoForm returnToView={() => setActiveTab('View')} />
      )}
    </main>
  );
}
