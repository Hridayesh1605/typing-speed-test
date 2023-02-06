import logo from "./logo.svg";
import React, {useEffect, useRef, useState} from 'react'
import "./App.css";

const words = () => 'hello world tesla data science python java swift react kotlin angular bitcoin ethirium pokemon spacex html css fan'.split(' ')
.sort(() => Math.random() > 0.5 ? 1 : -1)

function Word(props){
  const { text ,active,correct} = props

  if(correct===true){
    return <span className="correct">{text} </span>
  }
  if(correct===false){
    return <span className="incorrect">{text} </span>
  }
  if(active){
    return <span className="active">{text} </span>
  }
  return <span>{text} </span>
}

Word =React.memo(Word)


function Timer(props){
  const [time,setTime] = useState(0)
  const {correctWords,startCounting} = props

  useEffect(() =>{
    let id
    if(props.startCounting){
      id = setInterval(()=>
      {
        setTime(oldTime => oldTime+1)

      },1000)
    }
    return() => {
      clearInterval(id)
    }
  },[startCounting])
  const minutes = time/60

return <div>
  <p><b>Time:</b> {time}</p>
  <p><b>Speed:</b> {((correctWords/minutes) || 0).toFixed(2)} WPM</p>
  </div>
}

function App() {
  const [userInput,setUserInput]=useState('')
  const cloud = useRef(words())

  const [activeWordIndex,setActiveWordIndex] = useState(0)
  const [correctWordArray,setCorrectWorldArray] = useState([])
  const [startCounting,setStartCounting] = useState(false)

  function processInput(value){

    

    if(activeWordIndex === cloud.current.length){
      return
    }
    if(!startCounting){
      setStartCounting(true)
    }
    if(value.endsWith(' ')){

      if(activeWordIndex === cloud.current.length-1){
        setStartCounting(false)
        setUserInput('completed')
      
      }else{setUserInput('')}
      setActiveWordIndex(index => index + 1)
      

      
      
        setCorrectWorldArray(data => {
          const word = value.trim()
          const newResult = [...data]
          newResult[activeWordIndex]=word === cloud.current[activeWordIndex]
          return newResult
        })
      
    }else{
      setUserInput(value)
    }
  }
  return (
    <div class="box">
      <h1>Typing test</h1>
      <Timer
      startCounting={startCounting}
      correctWords={correctWordArray.filter(Boolean).length}/>
      <p>{cloud.current.map((word, index)=>{
        return <Word
        text={word}
        active={index === activeWordIndex}
        correct={correctWordArray[index]}
          />
      })}</p>
      <input id="input"
      placeholder="Type Here...."
        type="text"
        value={userInput}
        onChange={(e) => processInput(e.target.value) }
      />
    </div>
  );
}

export default App;
