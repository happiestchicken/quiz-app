import React from "react"
import '../styles.css'


export default function CheckAnswers(props) {
    
    return (
        <div className="check-ans">
            <button onClick={props.end} className="game-btns check">Check Answers</button>
            {props.err && <p className="error-message">psst... select an answer for each question</p>}
        </div>
    )
}