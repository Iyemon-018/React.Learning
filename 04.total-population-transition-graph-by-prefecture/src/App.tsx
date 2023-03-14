import { useEffect, useState } from 'react';
import './App.css';
import { AppTitle } from './components/AppTitle/AppTitle';
import { Prefectures } from './components/Prefectures/Prefectures';
import { TransitionGraph } from './components/TransitionGraph/TransitionGraph';
import { useLocation } from 'react-router-dom';
import { Prefecture } from './types/prefecture';

/**
 * 選択可能な都道府県の情報を定義するクラスです。
 * このクラスはチェックボックスで都道府県を表現する目的で使用します。
 */
class PrefectureValue implements Prefecture {

  constructor(code: number, name: string) {
    this.code = code;
    this.name = name;
    this.selected = false;
  }

  /**
   * 都道府県コードを設定、または取得します。
   */
  code: number;

  /**
   * 都道府県の名称を設定、または取得します。
   */
  name: string;

  /**
   * 現在の選択状態を設定、または取得します。
   */
  selected: boolean;
}

/**
 * 1年あたりの人口推移量を定義するクラスです。
 */
export class TotalPopulationPerYear {

  constructor(year: number, value: number) {
    this.year = year;
    this.value = value;
  }

  /**
   * この情報が記録されている年数を設定、または取得します。
   */
  year: number;

  /**
   * この年の人口推移を設定、または取得します。
   */
  value: number;
}

/**
 * 都道府県の総人口を集計した情報を定義するクラスです。
 * ここにはある1つの都道府県における5年ごとの人口推移の情報を保持します。
 */
export class TotalPopulationAggregate {

  constructor(prefCode: number, prefName: string, perYears: TotalPopulationPerYear[]) {
    this.prefCode = prefCode;
    this.prefName = prefName;
    this.perYears = perYears;
  }

  /**
   * 都道府県コードを設定、または取得します。
   */
  prefCode: number;

  /**
   * 都道府県の名称を設定、または取得します。
   */
  prefName: string;

  /**
   * 5年ごとの人口推移を設定、または取得します。
   * 1要素に付き1年の情報を保持します。
   * 人口推移の情報は5年ごとに集計する想定のため、すべての年数の情報が存在するわけではありません。
   */
  perYears: TotalPopulationPerYear[];
}

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
