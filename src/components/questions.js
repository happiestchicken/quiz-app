import React from "react"
import '../styles.css'

export default function Questions(props) {
    let rnd = Math.floor(Math.random() * 4) + 1
    const allAnswers = []
    let tot = 0
    let j = 0
    while (tot < 4) {
        if (tot === rnd - 1) {
            allAnswers.push(props.correctAnswer)
            tot++
        } else {
            allAnswers.push(props.otherAnswers[j])
            tot++
            j++
        }
    }

    let tmpArr = []
    for (let i = 0; i < 4; i++) {
        let tmpStr = allAnswers[i]
        let newStr = tmpStr.replace(/&#039;/g, "'")
        newStr = newStr.replace(/&quot;/g, '"')
        tmpArr.push(newStr)
    }

    let tmpTitle = props.question.replace(/&#039;/g, "'")
    tmpTitle = tmpTitle.replace(/&quot;/g, '"')

    function changeBtnColor() {
        // make background color change here
    }

    return (
        <div className="ques">
            <h3 className="question-title">{tmpTitle}</h3>
            <button onClick={changeBtnColor} className="answer-buttons">{tmpArr[0]}</button>
            <button className="answer-buttons">{tmpArr[1]}</button>
            <button className="answer-buttons">{tmpArr[2]}</button>
            <button className="answer-buttons">{tmpArr[3]}</button>
        </div>
    )
}