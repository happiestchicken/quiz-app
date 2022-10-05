import './styles.css'
import React from 'react';
import Start from './components/startPage'
import Question from './components/question'


function App() {  
  const [startMenu, setStartMenu] = React.useState(true)
  // const [apiDone, setApiDone] = React.useState(false)
  const [questions, setQuestions] = React.useState([])

  React.useEffect(() => {
    console.log("start menu?: ")
    console.log(startMenu)
      fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
          .then(res => res.json())
          .then(data => {
              setQuestions(data.results)
          })
  }, [startMenu])
 
  return (
    <main>
      {startMenu && <Start start={setStartMenu} />}
      {!startMenu && <Question questions={questions} />}
    </main>
  );
}

export default App;
