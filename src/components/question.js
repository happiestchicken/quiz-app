
import React from "react"
import '../styles.css'
import {nanoid} from "nanoid"
import Questions from './questions'
import Answer from './answer'



export default function Question(props) {
    const [answersState, setAnswersState] = React.useState(props.options)

    const answersss = props.options.map(answer => <button onClick={() => props.toggleSelected(answer)} className="answer">{answer}</button>)
    
    // const answers = answersState.map(answer=> {
    //     return {answer: answer, id: nanoid(), selected: false}
    // })



    // heres where i left off last night. when you now click a button, it will console.log the shiiiiiit in app.js but the rest of the code in that section throws a fit
    // trying to get it so that when you click an option it will go trigger that function in app.js and will change the selected parameter of the question to be the one just clicked



    const answersRender = answersState.map(answer => (
        <Answer answer={answer.answer} id={answer.id} toggleSelected={props.toggleSelected} />
    ))

    return (
        <div className="whole-box">
            <div className="question">
                {props.question}
            </div>
            {/* <div className="answer-box">
                {answers}
            </div> */}
            {answersss}
        </div>
    )
}