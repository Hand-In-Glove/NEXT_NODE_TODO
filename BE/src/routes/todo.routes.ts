import { Router } from 'express';
import { TodoController } from '../controllers/todo.controller';

const router = Router();
const todoController = new TodoController();

// Create
router.post('/todos', (req, res) => todoController.handleCreateTodo(req, res));
// Read (ALL)
router.get('/todos', (req, res) => todoController.handleGetTodos(req, res));
// Read (ID)
router.get('/todos/:id', (req, res) =>
  todoController.handleGetTodoById(req, res),
);
// Update
router.put('/todos/:id', (req, res) =>
  todoController.handleUpdateTodo(req, res),
);
// Delete
router.delete('/todos/:id', (req, res) =>
  todoController.handleDeleteTodo(req, res),
);

export default router;
