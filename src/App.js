import './styles.css'
import React from 'react';
import Start from './components/startPage'
import Question from './components/question'
import CheckAnswers from './components/answer'
import ScoreRestart from './components/scorerestart'


function App() {  
  const [startMenu, setStartMenu] = React.useState(true)
  const [questions, setQuestions] = React.useState([])
  const [apiDone, setApiDone] = React.useState(false)
  const [endGame, setEndGame] = React.useState(false)
  const [totalCorrect, setTotalCorrect] = React.useState(0)
  const [firstGame, setFirstGame] = React.useState(true)
  const [dispErrMsg, setDispErrMsg] = React.useState(false)

function toggleSelected(propsQuestion, selected) {
  if (!endGame) {
    setQuestions(prevQuestions => {
        return prevQuestions.map(theQuestion => {
            return propsQuestion === theQuestion.question ? {...theQuestion, selected_answer: selected} : theQuestion
        })
    })
  }
}

const chars = {'Å\x84':'n', 'Ã©':'e', 'âA':'"', 'Ã¡':'a', 'â\x80\x99':"'", 'â':'-', '(ç§¦)':"", '(é½)':"", '(è¶)':'', 'Ã':'i', 'â¦â':'...'};

  React.useEffect(() => {
    if(startMenu === false) {
    fetch("https://opentdb.com/api.php?amount=5&encode=base64")
        .then(res => res.json())
        .then(data => setQuestions(data.results.map(function(question) {
            return({
                    question:atob(question.question).replace(/Å\x84|Ã©|âA|Ã¡|â\x80\x99|â|(ç§¦)|(é½)|(è¶)|Ã|â¦â/g, x => chars[x]),
                    // question:question.question.replace(/&quot;|&#039;/g, m => chars[m]),
                    options:question.incorrect_answers.concat([question.correct_answer]).map(value => 
                      ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value).map(option => atob(option).replace(/Å\x84|Ã©|âA|Ã¡|â\x80\x99|â|(ç§¦)|(é½)|(è¶)|Ã|â¦â/g, x => chars[x])),
                    selected_answer:undefined,
                    correct_answer:atob(question.correct_answer)})
        })))
    }
}, [startMenu])

  function startGame() {
    console.log('hi')
    setStartMenu(false)
    setApiDone(true)
  }

  function endGameFunc() {
    let totSelected = 0
    for (let i = 0; i < 5; i++) {
      if (typeof questions[i].selected_answer != 'undefined') {
        totSelected++;
      }
    }
    if (totSelected === 5) {
      setDispErrMsg(false)
      setEndGame(true)
      checkAnswersFunc()
    } else {
      setDispErrMsg(true)
    }
  }

  function newGame() {
    setEndGame(false) // make button go back to check answers
    setStartMenu(true)
    setFirstGame(false)
    // setStartMenu(false)
    // setApiDone(true)
    // setNewGameCheck(false) // should make sure that the start screen doesn't re-appear
    setTotalCorrect(0) // set the numerator back to 0
    // startGame() // does what the start button would do normally
    console.log("the questions")
    console.log(questions)
  }

  function checkAnswersFunc() {
      for (let i = 0; i < 5; i++) {
        if (questions[i].selected_answer === questions[i].correct_answer) {
          setTotalCorrect(totalCorrect => totalCorrect + 1)
        }
      }
  }

  const questionsPage = questions.map(question => (
    <Question question={question.question} options={question.options} selected={question.selected_answer} correct={question.correct_answer} toggleSelected={toggleSelected} endGame={endGame} />
  ))

  let num = totalCorrect
  let den = questions.length

  let checkAnsBtn = !startMenu && !endGame

  let startMenuRender = startMenu && firstGame

  return (
    <main>
      <img src={process.env.PUBLIC_URL + `/images/blue-blob.png`} alt='blue-blob' className='blue-blob' />
      <img src={process.env.PUBLIC_URL + `/images/yellow-blob.png`} alt='yellow-blob' className='yellow-blob' />
      {startMenu && <Start start={startGame} />}
      <div className='question-box'>
        {apiDone && questionsPage}
        {checkAnsBtn && <CheckAnswers end={endGameFunc} err={dispErrMsg} />}
        {endGame && <ScoreRestart num={totalCorrect} den={den} new={newGame} />}
      </div>
    </main>
  );
}

export default App;
