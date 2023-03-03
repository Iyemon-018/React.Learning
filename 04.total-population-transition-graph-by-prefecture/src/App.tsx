import { useEffect } from 'react';
import './App.css';
import { AppTitle } from './components/AppTitle/AppTitle';
import { Prefectures } from './components/Prefectures/Prefectures';
import { TransitionGraph } from './components/TransitionGraph/TransitionGraph';

function App() {
  useEffect(()=>{
    // cf. https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch
    fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-API-KEY': '<API Token>'
      }
    }).then((response) => response.json()).then((data) => console.log(data));
  }, []);

  return (
    <div className="App">
      <AppTitle />
      <Prefectures onPrefectureChanged={(v) => console.log(`${v.name}: ${v.selected}`)}/>
      <TransitionGraph />
    </div>
  );
}

export default App;
