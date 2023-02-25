// Action を受けて状態を変更する。
import { TodoStateType } from "../../common/todo.type";
import { AddTodoActionType } from "./todoAction";
import { state as initialState } from "./todoState";

/**
 * アプリケーションの状態を更新する reducer です。
 * @param state アプリケーションの現在の状態が設定されます。
 * @param action この reducer を呼び出した Action が設定されます。
 * @returns 更新した状態を返します。
 */
export function todosReducer(state: TodoStateType = initialState, action: any): TodoStateType {
    switch (action.type) {
        case "ADD":
            const addAction = action as AddTodoActionType;
            return { todos: [...state.todos, addAction.task] }
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