
import './App.css';
import Input from './components/Input';
import Screen from './components/Screen';
import TopSection from './components/TopSection';
import { useState } from 'react'

function App() {
  const MAX_DIGITS = 5
  const [currInput, setCurrInput]= useState('')

  const updateScreen = (newInput) => {
    if(currInput.length < MAX_DIGITS)
      setCurrInput(currInput + newInput)
  }

  const deleteNum = () => {
    if(currInput.length > 0) {
      const newArr = currInput.split('').filter((num, i ) => 
        i != currInput.length - 1
      ).join('');
      console.log(newArr)
      setCurrInput(newArr);
    }
  }

  return (
    <div className='page-wrapper m-container'>
      <TopSection />
      <Screen input={currInput} updateInput={updateScreen} />
      <Input onNumClicked={updateScreen} onDeleteClicked={deleteNum}/>
    </div>
  );
}

export default App;
