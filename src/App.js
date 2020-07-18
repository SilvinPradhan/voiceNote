import React, {useState, useEffect} from 'react';
import './App.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'en-US';

function App() {

const [isListening, setIsListening] = useState('false');
const [note, setNote] = useState(null);
const [savedNotes, setSavedNotes] = useState([]);

const handleListen = () => {
  if(isListening){
    mic.start()
    mic.onend = () => {
      console.log('continue..')
      mic.start()
    } 
  }else{
    mic.stop()
    mic.onend = () => {
      console.log('Stopped Mic on Click')
    }
  }
}


  return (
    <>
    <h1>Voice Notes</h1>
    <div className="container">
      <div className="box">
        <h2>Current Note</h2>
        {isListening ? <span role="img">🎙</span> : <span role="img">🎙</span>}
        <button onClick={handleSaveNote} disabled={!note}>Save Note</button>
        <button onClick = {() => setIsListening(prevState => !prevState)}> Start / Stop</button>
        <p>{note}</p>
      </div>
      <div className='box'>
        <h2>Notes</h2>
        {savedNotes.map(n => (
          <p key={n}>{n}</p>
        ))}
      </div>
    </div>
    </>
  );
}

export default App;
