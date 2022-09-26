
import './App.css';
import Input from './components/Input';
import Screen from './components/Screen';
import TopSection from './components/TopSection';


function App() {
  return (
    <div className='page-wrapper m-container'>
      <TopSection />
      <Screen />
      <Input />
    </div>
  );
}

export default App;
