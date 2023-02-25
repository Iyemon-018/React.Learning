// 状態を定義します。
import { Todo } from "../../common/todo.type";

/**
 * アプリケーションの保持する Todo の配列です。
 * @returns Todo リストの情報をすべて返します。
 */
export const state = {
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
    ] as Todo[]
}