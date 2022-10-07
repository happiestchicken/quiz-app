import React from "react"
import '../styles.css'


export default function ScoreRestart(props) {
    
    return (
        <div className="score-div">
            <h5 className="score-class">You scored {props.num}/{props.den} correct answers</h5>
            <button onClick={props.new} className="game-btns again">Play again</button>
        </div>
)
}