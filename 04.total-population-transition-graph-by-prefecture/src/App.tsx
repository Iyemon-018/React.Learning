import './App.css';
import { AppTitle } from './components/AppTitle/AppTitle';
import { Prefectures } from './components/Prefectures/Prefectures';
import { TransitionGraph } from './components/TransitionGraph/TransitionGraph';

function App() {
  return (
    <div className="App">
      <AppTitle />
      <Prefectures />
      <TransitionGraph />
    </div>
  );
}

export default App;
