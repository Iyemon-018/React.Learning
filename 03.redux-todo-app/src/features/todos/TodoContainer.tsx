// TODO アプリのロジック部分を実装します。

import { useSelector } from "react-redux"
import { RootState } from "../../common/rootState.type";

export const TodoContainer = () => {
    const todos = useSelector((state: RootState) => state.todos);

    const args = {
        todos,
    };

    return <TodoPresenter {...args} />
}