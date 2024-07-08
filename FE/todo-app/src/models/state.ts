import { Todo } from "./todos";

export interface TodoState {
	todos: Todo[];
	loading: boolean;
	error: string | null;
}
