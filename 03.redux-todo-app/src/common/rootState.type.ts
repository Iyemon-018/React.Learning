// 管理しているすべての State のタイプを定義する。

import { store } from "../app/store";

export type RootState = ReturnType<typeof store.getState>;