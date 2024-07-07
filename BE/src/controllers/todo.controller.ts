import { Request, Response } from 'express';
import { TodoService } from '../services/todo.service';
import logger from '../logger';
import { INTERNAL_SERVER_ERROR } from '../models/error.model';

export class TodoController {
  private todoService: TodoService;

  constructor() {
    this.todoService = new TodoService();
  }

  async handleCreateTodo(req: Request, res: Response): Promise<void> {
    try {
      const { title, content } = req.body;
      const todo = await this.todoService.createTodo(title, content);
      res.status(201).json(todo);
    } catch (error) {
      logger.error('Error creating todo', { error });
      res.status(500).send(INTERNAL_SERVER_ERROR);
    }
  }

  async handleGetTodos(_req: Request, res: Response): Promise<void> {
    try {
      const todos = await this.todoService.getTodos();
      res.json(todos);
    } catch (error) {
      logger.error('Error', { error });
      res.status(500).send(INTERNAL_SERVER_ERROR);
    }
  }

  async handleGetTodoById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const todo = await this.todoService.getTodoById(id);
      if (todo) {
        res.json(todo);
      } else {
        res.status(404).send('Todo not found');
      }
    } catch (error) {
      logger.error('Error', { error });
      res.status(500).send(INTERNAL_SERVER_ERROR);
    }
  }

  async handleUpdateTodo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, content, complete } = req.body;
      const todo = await this.todoService.updateTodo(
        id,
        title,
        content,
        complete,
      );
      if (todo) {
        res.json(todo);
      } else {
        res.status(404).send('Todo not found');
      }
    } catch (error) {
      logger.error('Error', { error });
      res.status(500).send(INTERNAL_SERVER_ERROR);
    }
  }

  async handleDeleteTodo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const success = await this.todoService.deleteTodo(id);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).send('Todo not found');
      }
    } catch (error) {
      logger.error('Error', { error });
      res.status(500).send(INTERNAL_SERVER_ERROR);
    }
  }
}
