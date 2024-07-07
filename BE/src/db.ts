import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';
import { v4 as uuidv4 } from 'uuid';

const sampleTodos = [
  {
    id: uuidv4(),
    title: 'Feed Fish',
    content: 'Watch out for the sharks though.',
    complete: false,
  },
  {
    id: uuidv4(),
    title: 'School Holidays',
    content: 'Book kids clubs, must keep busy at all costs.',
    complete: false,
  },
  {
    id: uuidv4(),
    title: 'Workout',
    content: 'Go for a swim. Watch out for sharks though.',
    complete: false,
  },
];

let db: Database;

export const initializeDatabase = async () => {
  db = await open({
    filename: ':memory:',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE todos (
      id TEXT PRIMARY KEY,
      title TEXT,
      content TEXT,
      complete INTEGER
    )
  `);

  sampleTodos.forEach(async (todo) => {
    await db.run(
      'INSERT INTO todos (id, title, content, complete) VALUES (?, ?, ?, ?)',
      [todo.id, todo.title, todo.content, Number(todo.complete)],
    );
  });
};

export const getDb = () => {
  return db;
};
