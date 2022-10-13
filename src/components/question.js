import React from "react"
import '../styles.css'
import {nanoid} from "nanoid"


export default function Question(props) {
    const [answersState, setAnswersState] = React.useState(props.options)
    const [selected, setSelected] = React.useState(props.selected)
    const [gameOver, setGameOver] = React.useState(props.endGame)
    const [correctAnswer, setCorrectAnswer] = React.useState(props.correct)

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

    /* conditional rendering. styles the buttons according to whether they are selected or not
    and at the end of the game, whether they are the correct selections */
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

    // maps each multiple choice answer with its appropriate styling
    const answers = answersState.map(answer => <button onClick={() => props.toggleSelected(props.question, answer)} key={nanoid()} style={styler(answer)} className="option-btns">{answer}</button>)
    
    return (
        <div className="whole-answers-div">
            <span className="question-title">{props.question}</span>
            <div className="answers-box">
                {answers}
            </div>
            <hr></hr>
        </div>
    )
}