import './styles.css'
import React from 'react';
import Start from './components/startPage'
import Question from './components/question'


function App() {  
  const [startMenu, setStartMenu] = React.useState(true)
  const [questions, setQuestions] = React.useState([])
  const [apiDone, setApiDone] = React.useState(false)

  // making the start screen disappear and the other screen apprear
  function startGame() {
    setStartMenu(false)
    setApiDone(true)
}



function toggleSelected(selected) {
  console.log("shiiiiit")
  console.log(selected)
    // setQuestions(prevQuestions => {
    //     return prevQuestions.map(question => {
    //         return question, question.selected === selected
    //     })
    // })
}




  React.useEffect(() => {
    if(startMenu === false) {
    fetch("https://opentdb.com/api.php?amount=5")
        .then(res => res.json())
        .then(data => setQuestions(data.results.map(function(question) {
            return({
                    question:question.question,
                    options:question.incorrect_answers.concat([question.correct_answer]).map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value),
                    selected_answer:undefined,
                    correct_answer:question.correct_answer})
        })))
    }

}, [startMenu])


  const questionsPage = questions.map(question => (
    <Question question={question.question} options={question.options} selected={question.selected_answer} toggleSelected={toggleSelected}/>
  ))

  return (
    <main>
        {startMenu && <Start start={startGame} />}
      <div className='question-box'>
        {apiDone && questionsPage}
      </div>
    </main>
  );
}

export default App;
