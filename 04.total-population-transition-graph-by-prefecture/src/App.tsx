import { useEffect } from 'react';
import './App.css';
import { AppTitle } from './components/AppTitle/AppTitle';
import { Prefectures } from './components/Prefectures/Prefectures';
import { TransitionGraph } from './components/TransitionGraph/TransitionGraph';
import { useLocation } from 'react-router-dom';

function App() {
  // 前画面から状態を受け取る。
  // この状態には API Token が含まれている。
  const { state } = useLocation();

  useEffect(() => {
    // cf. https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch
    fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-API-KEY': state.apiToken
      }
    })
      .then((response) => response.json())
      .then((data) => console.log(data));     // とりあえずデバッグでレスポンスをログ表示している。
  }, []);

  return (
    <div>
      <AppTitle />
      <Prefectures onPrefectureChanged={(v) => console.log(`${v.name}: ${v.selected}`)} />
      <TransitionGraph />
    </div>
  );
}

export default App;
