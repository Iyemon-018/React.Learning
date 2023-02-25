// 状態を定義します。
import { TodoStateType } from "../../common/todo.type";

/**
 * アプリケーションの保持する Todo の配列です。
 * @returns Todo リストの情報をすべて返します。
 */
export const state: TodoStateType = {
    todos: [
        {
            id: 1,
            title: "テスト1",
            content: "テスト1の内容",
            isCompleted: false,
        }, {
            id: 2,
            title: "テスト2",
            content: "テスト2の内容",
            isCompleted: false,
        }
    ],
}