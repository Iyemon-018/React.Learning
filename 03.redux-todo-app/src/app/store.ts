import { legacy_createStore as createStore } from "redux";
import { todosReducer } from "../features/todos/todoReducer";

// これでこのアプリケーションで使用する store を構築している。
// 以降はこの store を使用して状態を管理する。
export const store = createStore(todosReducer);