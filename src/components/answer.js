import React from "react"
import '../styles.css'
import {nanoid} from "nanoid"


export default function Answer(props) {

    const styles = {
        backgroundColor: props.selected ? "red" : "blue"
    }

    // console.log("fuck")
    // console.log(props.answer)

    return (
        <div>
            <button style={styles} onClick={() => props.toggleSelected(props.answer)} className="answer-button">{props.answer}</button>
        </div>
    )
}