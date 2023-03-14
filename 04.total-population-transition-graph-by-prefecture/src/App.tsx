import { useEffect, useState } from 'react';
import './App.css';
import { AppTitle } from './components/AppTitle/AppTitle';
import { Prefectures } from './components/Prefectures/Prefectures';
import { TransitionGraph } from './components/TransitionGraph/TransitionGraph';
import { useLocation } from 'react-router-dom';
import { Prefecture, PrefectureValue, TotalPopulationAggregate, TotalPopulationPerYear } from './types/prefecture';

function App() {
  // 前画面から状態を受け取る。
  // この状態には API Token が含まれている。
  const { state } = useLocation();
  const [prefectures, setPrefectures] = useState(Array<PrefectureValue>(47));
  const [aggregates, setAggregates] = useState(Array<TotalPopulationAggregate>());

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
      const newPrefectures = json.result
        .map((v: {
          prefCode: number,
          prefName: string
        }) => new PrefectureValue(v.prefCode, v.prefName));

      setPrefectures(newPrefectures);
    })()
  }, []);

  /**
   * 都道府県のチェックボックスの状態が変更されたときに呼ばれるイベントハンドラです。
   * @param v チェック状態が変更された都道府県の情報が設定されます。
   */
  async function handlePrefectureChanged(v: Prefecture): Promise<void> {
    // cf. https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html
    // 選択された都道府県の人口構成を取得する。
    const prefCode = v.code;
    const response = await fetch(`https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}&cityCode=-`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-API-KEY': state.apiToken
      }
    });

    const json = await response.json();

    // "label": "総人口" のデータが必要になる。
    // ここには5年ごとの人口推移が入っており、これをグラフに出力したい。
    // 以下はグラフに出力するための形式に変換している。
    const totalPopulationJson = json.result
      .data
      .find((v:
        {
          label: string,
          data: {
            year: number,
            value: number
          }
        }) => v.label === "総人口");
    const perYears = totalPopulationJson.data
      .map((v: {
        year: number,
        value: number
      }) => new TotalPopulationPerYear(v.year, v.value));
    const aggregate = new TotalPopulationAggregate(v.code, v.name, perYears);
    const newValue = [...aggregates, aggregate];

    setAggregates(newValue);
  }

  return (
    <div>
      <AppTitle />
      <Prefectures
        onPrefectureChanged={(v) => handlePrefectureChanged(v)}
        prefectures={prefectures} />
      <TransitionGraph aggregates={aggregates} />
    </div>
  );
}

export default App;
