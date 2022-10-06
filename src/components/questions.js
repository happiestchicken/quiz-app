// import React from "react"
// import '../styles.css'
// import {nanoid} from "nanoid"
// import Answer from './answer'


// export default function Questions(props) {

//     let rnd = Math.floor(Math.random() * 4) + 1
//     const allAnswers = []
//     let tot = 0
//     let j = 0
//     while (tot < 4) {
//         if (tot === rnd - 1) {
//             allAnswers.push(props.correctAnswer)
//             tot++
//         } else {
//             allAnswers.push(props.otherAnswers[j])
//             tot++
//             j++
//         }
//     }

//     let tmpArr = []
//     for (let i = 0; i < 4; i++) {
//         let tmpStr = allAnswers[i]
//         let newStr = tmpStr.replace(/&#039;/g, "'")
//         newStr = newStr.replace(/&quot;/g, '"')
//         tmpArr.push({value: newStr, id: nanoid(), color: true})
//     }
//     let tmpTitle = props.question.replace(/&#039;/g, "'")
//     tmpTitle = tmpTitle.replace(/&quot;/g, '"')

//     function changeBtnColor(id) {
//         console.log("kevin")
//         for (let i = 0; i < tmpArr.length; i++) {
//             if (tmpArr[i].id === id) {
//                 tmpArr[i].color = false
//             }
//         }  
//     }

//     function toggle(id) {
//         for (let i = 0; i < 4; i++) {
//             if (tmpArr[i].id === id) {
//                 console.log("color")
//                 console.log(tmpArr[i].color)
//                 tmpArr[i].color = false
//                 console.log(tmpArr[i].color)

//             }
//         }
//     }

//     const theAnswers = tmpArr.map(answer => (
//         <Answer
//             key={answer.id}
//             id={answer.id}
//             answer={answer.value}
//             toggle={() => toggle(answer.id)}
//             color={answer.color}
//         />
//     ))

//     return (
//         <div className="ques">
//             <h3 className="question-title">{tmpTitle}</h3>
//             {theAnswers}
//         </div>
//     )
// }