import { v4 as uuidv4 } from 'uuid';
import { Todo } from '../models/todo.model';
import { getDb } from '../db';

/**
 * NOTE: SQLlite doesn't recognise boolean data and only stores integer value 1 or 0
 * so where we are writing or reading this data in the service a conversion happens.
 */
export class TodoService {
  public async createTodo(title: string, content: string): Promise<Todo> {
    const db = getDb();
    const todo: Todo = { id: uuidv4(), title, content, complete: false };
    await db.run(
      'INSERT INTO todos (id, title, content, complete) VALUES (?, ?, ?, ?)',
      [todo.id, todo.title, todo.content, Number(todo.complete)],
    );
    return todo;
  }

  public async getTodos(): Promise<Todo[]> {
    const db = getDb();
    const todos = await db.all<Todo[]>('SELECT * FROM todos');
    return todos.map((todo) => ({ ...todo, complete: Boolean(todo.complete) }));
  }

  public async getTodoById(id: string): Promise<Todo | null> {
    const db = getDb();
    const todo = await db.get<Todo>('SELECT * FROM todos WHERE id = ?', id);
    return todo || null;
  }

  public async updateTodo(
    id: string,
    title: string,
    content: string,
    complete: boolean,
  ): Promise<Todo | null> {
    const db = getDb();
    await db.run(
      'UPDATE todos SET title = ?, content = ?, complete = ? WHERE id = ?',
      [title, content, Number(complete), id],
    );
    const updatedTodo = await this.getTodoById(id);
    updatedTodo && (updatedTodo.complete = Boolean(updatedTodo?.complete));
    return updatedTodo;
  }

  public async deleteTodo(id: string): Promise<boolean> {
    const db = getDb();
    const result = await db.run('DELETE FROM todos WHERE id = ?', id);
    return (result.changes ?? 0) > 0;
  }
}
