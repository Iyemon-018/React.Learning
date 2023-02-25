// Action を受けて状態を変更する。
import { TodoStateType } from "../../common/todo.type";
import { state as initialState } from "./todoState";

export function todosReducer(state = initialState, action: any): TodoStateType {
    switch (action.type) {
        case "ADD":
            return { todos: [...state.todos, action.payload] }
        case "REMOVE":
            return { todos: state.todos.filter((todo) => todo.id !== action.payload) }
        case "TOGGLE_COMPLETE":
            return {
                todos: state.todos.map((todo) => {
                    if (todo.id !== action.payload) return todo;
                    return { ...todo, isCompleted: !todo.isCompleted };
                })
            }
        default:
            break;
    }
    return state;
}