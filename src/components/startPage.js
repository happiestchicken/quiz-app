import React from "react"
import '../styles.css'


export default function Start(props) {

    // this function will set the start prop to false which makes the start
    // screen go away and render the questions in app.js
    function startMenuAway() {
        props.start(false)
    }

    return (
        <div className="start-page">
            <h1 className="quizzical-title">Quizzical</h1>
            <h4 className="start-description">Some description if needed</h4>
            <button onClick={startMenuAway} className="start-btn">Start quiz</button>
        </div>
    )
}