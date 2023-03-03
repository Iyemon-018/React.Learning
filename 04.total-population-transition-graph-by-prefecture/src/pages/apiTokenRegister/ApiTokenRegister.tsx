import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * API Token を入力するためのコンポーネントです。
 * ユーザーが API Token を登録して、/main へ遷移する機能を持っています。
 * このコンポーネントは1画面で表示することを想定しています。
 * 
 * @returns 
 */
export const ApiTokenRegister = () => {
    const navigate = useNavigate();
    const [apiToken, setApiToken] = useState("");
    
    function handleRegisterClick(): void {
        navigate('main', {state: {apiToken: apiToken}});
    }

    return (
        <div>
            <h1>RESAS API Token 登録</h1>
            <p>RESAS API を実行するために API Token を入力してください。</p>
            <input type="text" value={apiToken} onChange={(e) => setApiToken(e.target.value)}/>
            <input type="button" value={"登録する"} onClick={() => handleRegisterClick()}/>
        </div>
    )
}