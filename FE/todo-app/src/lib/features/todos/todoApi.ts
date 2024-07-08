import { Todo } from "@/models/todos";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_TODO_API_URL as string;

export const getTodos = async (): Promise<Todo[]> => {
	const response = await axios.get(API_BASE);
	return response.data;
};

export const addTodo = async (todo: Omit<Todo, "id">): Promise<Todo> => {
	const response = await axios.post(API_BASE, todo);
	return response.data;
};

export const deleteTodo = async (id: string) => {
	await axios.delete(`${API_BASE}/${id}`);
	return id;
};

export const updateTodo = async (todo: Todo) => {
	const response = await axios.put(`${API_BASE}/${todo.id}`, todo);
	return response.data;
};
