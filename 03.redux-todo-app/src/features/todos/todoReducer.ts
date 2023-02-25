// Action を受けて状態を変更する。
import { TodoStateType } from "../../common/todo.type";
import { AddTodoActionType, RemoveTodoActionType, ToggleCompleteActionType } from "./todoAction";
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
            const removeAction = action as RemoveTodoActionType;
            return { todos: state.todos.filter((todo) => todo.id !== removeAction.id) }
        case "TOGGLE_COMPLETE":
            const toggleAction = action as ToggleCompleteActionType;
            return {
                todos: state.todos
                    .map((todo) => {
                        if (todo.id !== toggleAction.id) return todo;
                        return { ...todo, isCompleted: !todo.isCompleted };
                    })
            }
        default:
            break;
    }
    return state;
}