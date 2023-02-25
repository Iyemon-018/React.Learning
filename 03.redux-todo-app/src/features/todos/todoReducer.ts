// Action を受けて状態を変更する。
import { state as initialState } from "./todoState";

export const todosReducer = (state = initialState, action: any) => {
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