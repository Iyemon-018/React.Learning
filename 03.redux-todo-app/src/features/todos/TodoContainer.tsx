// TODO アプリのロジック部分を実装します。

import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../common/rootState.type";
import { TodoPresenter, TodoPresenterProps } from "./TodoPresenter";
import { addTodoAction, removeTodoAction, toggleCompleteAction } from "./todoAction";
import { Todo } from "../../common/todo.type";

export const TodoContainer = () => {
    const todos = useSelector((state: RootState) => state.todos);

    // Todo リストの最大 ID を取得する。
    const maxID = todos.length ? todos.slice(-1)[0].id : 0;

    const dispatch = useDispatch();

    function addTodo(title: string, content: string) {
        const newTodo: Todo = {
            id: maxID + 1,
            title: title,
            content: content,
            isCompleted: false,
        }
        dispatch(addTodoAction(newTodo));
    }

    function removeTodo(id: number): void {
        dispatch(removeTodoAction(id));
    }

    function toggleComplete(id: number) {
        dispatch(toggleCompleteAction(id));
    }

    const args: TodoPresenterProps = {
        todos,
        addTodo,
        removeTodo,
        toggleComplete,
    };

    return <TodoPresenter {...args} />
}
