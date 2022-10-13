import React from 'react';
import './styles.css'
import Start from './components/startPage'
import Question from './components/question'
import {nanoid} from "nanoid"


export default function App() {
  const [startMenu, setStartMenu] = React.useState(true)
  const [questions, setQuestions] = React.useState([])
  const [dispQuestions, setDispQuestions] = React.useState(false)
  const [endGame, setEndGame] = React.useState(false)
  const [totalCorrect, setTotalCorrect] = React.useState(0)
  const [dispErrMsg, setDispErrMsg] = React.useState(false)
  const [gameCounter, setGameCounter] = React.useState(0) 

  // retrieving questions from trivia API
  React.useEffect(() => {
    if(startMenu === false) {
    fetch("https://opentdb.com/api.php?amount=5")
      .then(res => res.json())
      .then(data => setQuestions(data.results.map(function(question) {
          return({
                  question:decodeEntity(question.question),
                  options:question.incorrect_answers.concat([question.correct_answer]).map(value => 
                    ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value).map(option => decodeEntity(option)),
                  selected_answer:undefined,
                  correct_answer:decodeEntity(question.correct_answer),
                  id: nanoid()})
      })))
    }
    window.scrollTo(0, 0)
  }, [startMenu, gameCounter])

  // function used to decode the HTML encoding which the api gives
  function decodeEntity(inputStr) {
    var textarea = document.createElement("textarea");
    textarea.innerHTML = inputStr;
    return textarea.value;
  }

  // updates the questions array to contain the selected answer
  function toggleSelected(propsQuestion, selected) {
    if (!endGame) {
      setQuestions(prevQuestions => {
          return prevQuestions.map(theQuestion => {
              return propsQuestion === theQuestion.question ? {...theQuestion, selected_answer: selected} : theQuestion
          })
      })
    }
  }

  /* checks to ensure that all questions have been answered. 
  If so, calls function which checks how many answers were correct. 
  If not, displays error message. */
  function endGameFunc() {
    let totalSelected = 0
    for (let i = 0; i < 5; i++) {
      if (typeof questions[i].selected_answer != 'undefined') {
        totalSelected++;
      }
    }
    if (totalSelected === 5) {
      setDispErrMsg(false)
      setEndGame(true)
      checkAnswersFunc()
    } else {
      setDispErrMsg(true)
    }
  }

  // when start button clicked, renders the questions to page
  function startGame() {
    setStartMenu(false)
    setDispQuestions(true)
  }

  // when user wants to play a new game, this function will render new questions
  function newGame() {
    setEndGame(false)
    setStartMenu(true)
    setTotalCorrect(0)
    startGame()
    setGameCounter(count => count + 1)
  }

  // checks how many answers were correct
  function checkAnswersFunc() {
      for (let i = 0; i < 5; i++) {
        if (questions[i].selected_answer === questions[i].correct_answer) {
          setTotalCorrect(totalCorrect => totalCorrect + 1)
        }
      }
  }

  // maps the questions to be displayed
  const questionsPage = questions.map(question => (
    <Question key={question.id} question={question.question} options={question.options} selected={question.selected_answer}
    correct={question.correct_answer} toggleSelected={toggleSelected} endGame={endGame} />
  ))

  /* used so that the start page only renders before the start button is clicked, 
  but also only when its the first game being played */
  let checkAnsBtn = !startMenu && !endGame

  return (
    <main>
      <img src={process.env.PUBLIC_URL + `/images/blue-blob.png`} alt='blue-blob' className='blue-blob' />
      <img src={process.env.PUBLIC_URL + `/images/yellow-blob.png`} alt='yellow-blob' className='yellow-blob' />
      {startMenu && <Start start={startGame} />}
      {dispQuestions && 
      <div className='question-box'>
        {questionsPage}
        {checkAnsBtn && 
          <div className="check-answers-div">
            <button onClick={endGameFunc} className="game-btns check-ans-btn">Check Answers</button>
            <div className='err-msg-div'>
              {dispErrMsg && <p className="error-message">psst... select an answer for each question</p>}
            </div>
          </div>}
        {endGame && 
          <div className="score-div">
            <h5 className="score-class">You scored {totalCorrect}/5 correct answers</h5>
            <button onClick={newGame} className="game-btns play-again-btn">Play again</button>
          </div>}
      </div>}
    </main>
  );
}