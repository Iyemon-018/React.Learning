// Redux で言うところの ActionCreator の役割を果たす。

import { Todo } from "../../common/todo.type";

/**
 * Todo タスクを追加する際の Action によって実行する操作を定義します。
 */
export type AddTodoActionType = {
    /**
     * タイプ名
     */
    type: string;
    /**
     * 新規追加された Todo タスクオブジェクトです。
     */
    task: Todo;
}

/**
 * Todo を新規追加するための Action　です。
 * @param newTodo 新規追加対象の Todo 情報を設定します。
 * @returns Todo 新規追加アクションを返します。
 */
export function addTodoAction(newTodo: Todo): AddTodoActionType {
    return {
        type: "ADD",
        task: newTodo,
    };
};

/**
 * Todo タスクの完了状態を切り替えるための Action によって実行する操作を定義します。
 */
export type ToggleCompleteActionType = {
    type: string;
    /**
     * 変更対象のタスク識別子です。
     */
    id: number;
}

/**
 * 既存の Todo の完了状態を変更するための Action です。
 * @param id 完了状態を切り替える対象の Todo 識別子を設定します。
 * @returns Todo 完了状態変更アクションを返します。
 */
export function toggleCompleteAction(id: number): ToggleCompleteActionType {
    return {
        type: "TOGGLE_COMPLETE",
        id: id,
    };
};

/**
 * 既存の Todo を削除するための Action によって実行する操作を定義します。
 */
export type RemoveTodoActionType = {
    type: string;
    /**
     * 削除対象のタスク識別子です。
     */
    id: number;
}

/**
 * 既存の Todo を削除するための Action です。
 * @param id 削除対象の Todo 識別子を設定します。
 * @returns Todo 削除アクションを返します。
 */
export function removeTodoAction(id: number): RemoveTodoActionType {
    return {
        type: "REMOVE",
        id: id,
    };
};