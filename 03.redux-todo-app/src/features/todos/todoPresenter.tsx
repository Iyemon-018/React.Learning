// TODO アプリの表示部分を実装します。

import React, { useState } from "react";
import { Todo } from "../../common/todo.type"

export type TodoPresenterProps = {
    todos: Todo[];
    addTodo: (title: string, content: string) => void;
    removeTodo: (id: number) => void;
    toggleComplete: (id: number) => void;
};

export const TodoPresenter: React.FC<TodoPresenterProps> = ({
    todos,
    addTodo,
    removeTodo,
    toggleComplete,
}) => {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    function sendTodo(): void {
        addTodo(title, content);
        setTitle("");
        setContent("");
    }

    return (
        <>
            <form>
                <label>
                    タイトル:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label>
                    内容:
                    <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
                </label>
                <button type="button" onClick={() => sendTodo()}>送信</button>
            </form>
            <div>-------------------</div>
            <h1>Todo リスト</h1>
            {todos.map((todo: Todo) => {
                return (
                    <React.Fragment key={todo.id}>
                        <div>{todo.title}: {todo.isCompleted ? "完了" : "未完了"}</div>
                        <div>内容: {todo.content}</div>
                        <button type="button" onClick={() => toggleComplete(todo.id)}>{todo.isCompleted ? "戻す" : "完了"}</button>
                        <button type="button" onClick={() => removeTodo(todo.id)}>削除</button>
                    </React.Fragment>
                )
            })}
        </>
    );
}