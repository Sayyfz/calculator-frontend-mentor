
import './App.css';
import Input from './components/Input';
import Screen from './components/Screen';
import TopSection from './components/TopSection';
import { useReducer } from 'react'

const MAX_DIGITS = 5; 

  // ACTIONS

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation', 
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
}

// Reducer Related Functions

const addDigit = (state,payload) => {
  if(state.overwrite) {
    return {
      ...state,
      currInput: payload.digit,
      overwrite: false
    }
  }
  return (payload.digit === "0" && state.currInput === "0") 
  || (state.currInput && state.currInput.length >= MAX_DIGITS) 
  || (payload.digit === "." && state.currInput.includes('.')) ? 
    state :
  {
    ...state,
    currInput: `${state.currInput || ''}${payload.digit}` 
  } 
} 

const deleteDigit = (state) => {
  if(state.overwrite) {
    return {
      ...state,
      overwrite: false,
      currInput: null
    }
  }
  if(state.currInput == null) {return state}
  if(state.currInput.length === 1) {
    return {
      ...state,
      currInput: null // This is instead of leaving the currentOperand with an empty string value
    }
  }
  return {
    ...state,
    currInput: state.currInput.slice(0, -1)
  }
}



const evaluate = ({ currInput, prevInput, operation }) => {
  const prev = parseFloat(prevInput)
  const current = parseFloat(currInput)
  if(isNaN(prev) || isNaN(current)) return ""

  let computation = ""
  switch(operation) {
    case "+":
      computation = prev + current
      break;
    case "-":
      computation = prev - current
      break;
    case "x":
      computation = prev * current
      break;
    case "/":
      computation = prev / current
      break;
  }

  return computation.toString()
}

const chooseOperation = (state, payload) => {
  if(state.currInput == null && state.prevInput == null)
    return state

  if(state.currInput == null) {
    return {
      ...state, 
      operation: payload.operation,
    }
  }
  if(state.prevInput == null) {
    return {
      ...state, operation: payload.operation,
      prevInput: state.currInput,
      currInput: null
    }
  }

  return { 
    ...state,
    prevInput: evaluate(state),
    operation: payload.operation,
    currInput: null
  }
}
// Reducer

  const reducer = (state, {type, payload}) => {
    switch(type) {

      case ACTIONS.ADD_DIGIT:
       return addDigit(state,payload)
      case ACTIONS.CHOOSE_OPERATION:
        return chooseOperation(state, payload);
      case ACTIONS.CLEAR:
        return {};
      case ACTIONS.DELETE_DIGIT:
        return deleteDigit(state)
      case ACTIONS.EVALUATE:
        if(state.operation == null ||state.currInput == null ||state.prevInput == null)
          return state 
        return {
          ...state,
          overwrite: true,
          prevInput: null,
          currInput: evaluate(state),
          operation: null
        }
      default: return state;
    }
  }

function App() {
  
  // States and Variables
  const [{currInput, prevInput, operation}, dispatch] = useReducer(reducer, {});

  // Rendering

  return (
    <div className='page-wrapper m-container'>
      <TopSection />
      <Screen input={currInput} previousInput={prevInput} operation={operation} />
      <Input dispatch={dispatch}/>
    </div>
  );
}

export default App;
