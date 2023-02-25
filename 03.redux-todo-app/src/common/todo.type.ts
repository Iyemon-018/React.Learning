// 当アプリで出てくる TODO のタイプを定義する。

/**
 * Todo タスクの持つ情報を定義する型です。
 */
export type Todo = {
    /**
     * タスクの識別子です。
     */
    id: number;
    /**
     * タスク内容を簡略に表したタイトルです。
     */
    title: string;
    /**
     * タスク内容を詳細に表したコンテンツです。
     */
    content: string;

    /**
     * このタスクが完了したかどうかです。
     * true: 完了済み, false: 未完了
     */
    isCompleted: boolean;
}

/**
 * アプリケーションで管理するすべての Todo の状態を定義する型です。
 */
export type TodoStateType = {
    /**
     * 当アプリケーションのすべての Todo 情報です。s
     */
    todos: Todo[];
}