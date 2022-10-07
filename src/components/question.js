
import React from "react"
import '../styles.css'
import {nanoid} from "nanoid"
import Questions from './questions'
import Answer from './answer'


export default function Question(props) {
    const [answersState, setAnswersState] = React.useState(props.options)
    const [selected, setSelected] = React.useState(props.selected)
    const [gameOver, setGameOver] = React.useState(props.endGame)
    const [correctAnswer, setCorrectAnswer] = React.useState(props.correct)

    // console.log(answersState)
    // console.log(props.question)

    React.useEffect(() => {
        setCorrectAnswer(props.correct)
    }, [props.correct])

    React.useEffect(() => {
        setAnswersState(props.options)
    }, [props.options])

    React.useEffect(() => {
        setGameOver(props.endGame)
    }, [props.endGame])

    React.useEffect(() => {
        setSelected(props.selected)
    }, [props.selected])

    function styler(answer) {
        if (gameOver === true)
        {
            if (answer === correctAnswer) {
                return ({backgroundColor: "#74D7A2", border: '#74D7A2 solid 1px'})
            } else if (answer === selected) {
                return({backgroundColor: "#F8BCBC", opacity:0.5, border: '#F8BCBC solid 1px'})
            } else {
                return({backgroundColor: "#ffffff", opacity:0.5, border: '#4d5b9e solid 1px'})
            }
        } else {
            if (selected === answer) {
                return({backgroundColor: "#D6D8F5", border: '#D6D8F5 solid 1px'})
            } else {
                return({backgroundColor: "#ffffff", border: '#4d5b9e solid 1px'})
            }
        }
    }

    const answers = answersState.map(answer => <button onClick={() => props.toggleSelected(props.question, answer)} style={styler(answer)} className="option">{answer}</button>)
    
    return (
        <div className="whole-box">
            <span className="question">{props.question}</span>
            <div className="answers-box">
                {answers}
            </div>
            <hr></hr>
        </div>
    )
}