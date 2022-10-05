import React from "react"
import '../styles.css'
import {nanoid} from "nanoid"
import Questions from './questions'


export default function Question(props) {
    const [apiDone, setApiDone] = React.useState(false)

    // adding an id to each question in the questions array
    const questionsID = props.questions.map(question => {
      return {...question, id:nanoid()}
    })

    React.useEffect(() => {
        if (typeof props.questions[0] !== 'undefined') {
          setApiDone(true)
          console.log("the api is done")
        }
      }, [props.questions])

    // React.useEffect(() => {
    //     console.log("is the api done?: ")
    //     console.log(apiDone)
    //     if (apiDone === true) {
    //         console.log(questionsID[0].question)
    //         console.log(questionsID)        
    //     }
    // }, [apiDone])

    console.log("questions array: ")
    console.log(questionsID)

    const questionElements = questionsID.map(question => (
        <Questions 
        key={question.id}
        startMenu={props.start}
        question={question.question}
        correctAnswer={question.correct_answer}
        otherAnswers={question.incorrect_answers}
        id={question.id}
        />
      ))
    
    
    return (
        <div className="questions-background">
            <div className="question-box">
                {questionElements}
            </div>
        </div>
    )
}