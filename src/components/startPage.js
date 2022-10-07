import React from "react"
import '../styles.css'


export default function Start(props) {
    
    return (
        <div className="start-page">
            <h1 className="quizzical-title">Quizzical</h1>
            <h4 className="start-description">Some description if needed</h4>
            <button onClick={props.start} className="start-btn">Start quiz</button>
        </div>
    )
}