// 当アプリで出てくる TODO のタイプを定義する。

export type Todo = {
    id: number;
    title: string;
    content: string;
    isCompleted: boolean;
}