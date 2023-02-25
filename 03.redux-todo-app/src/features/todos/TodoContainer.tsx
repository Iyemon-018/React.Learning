// TODO アプリのロジック部分を実装します。

import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../common/rootState.type";
import { TodoPresenter, TodoPresenterProps } from "./TodoPresenter";
import { addTodoAction, removeTodoAction, toggleCompleteAction } from "./todoAction";
import { Todo } from "../../common/todo.type";

/**
 * Todo アプリ全体を構成するコンポーネントです。
 * @returns 
 */
export function TodoContainer(): JSX.Element {
    const todos = useSelector((state: RootState) => state.todos);

    // Todo リストの最大 ID を取得する。
    const maxID = todos.length ? todos.slice(-1)[0].id : 0;

    const dispatch = useDispatch();

    const args: TodoPresenterProps = {
        todos,
        addTodo(title, content) {
            const newTodo: Todo = {
                id: maxID + 1,
                title: title,
                content: content,
                isCompleted: false,
            }
            dispatch(addTodoAction(newTodo));
        },
        removeTodo(id) {
            dispatch(removeTodoAction(id));
        },
        toggleComplete(id) {
            dispatch(toggleCompleteAction(id));
        },
    };

    return <TodoPresenter {...args} />
}
