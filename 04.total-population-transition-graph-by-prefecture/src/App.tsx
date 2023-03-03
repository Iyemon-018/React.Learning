import { useEffect, useState } from 'react';
import './App.css';
import { AppTitle } from './components/AppTitle/AppTitle';
import { Prefectures } from './components/Prefectures/Prefectures';
import { TransitionGraph } from './components/TransitionGraph/TransitionGraph';
import { useLocation } from 'react-router-dom';
import { Prefecture } from './types/prefecture';

class PrefectureValue implements Prefecture {

  constructor(code: number, name: string) {
    this.code = code;
    this.name = name;
    this.selected = false;
  }

  code: number;
  name: string;
  selected: boolean;

}

function App() {
  // 前画面から状態を受け取る。
  // この状態には API Token が含まれている。
  const { state } = useLocation();
  const [prefectures, setPrefectures] = useState(Array<PrefectureValue>(47));

  useEffect(() => {
    // cf. https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch
    (async () => {
      const response = await fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'X-API-KEY': state.apiToken
        }
      });
      const json = await response.json();
      const newPrefectures = json.result.map((v: { prefCode: number, prefName: string }) => new PrefectureValue(v.prefCode, v.prefName));     // とりあえずデバッグでレスポンスをログ表示している。
      setPrefectures(newPrefectures);
    })()
  }, []);

  return (
    <div>
      <AppTitle />
      <Prefectures
        onPrefectureChanged={(v) => console.log(`${v.name}[${v.code}]: ${v.selected}`)}
        prefectures={prefectures} />
      <TransitionGraph />
    </div>
  );
}

export default App;
