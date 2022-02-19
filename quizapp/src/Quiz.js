import React from 'react'
import Option from './Option'

export default function Quiz(props){
    const allOptions = props.allOptions.map(opt => {
        return <Option 
        key={opt.option}
        option={opt.option} 
        selected={props.selected} 
        correctAnswer={props.correctAnswer}
        isChosen={opt.isChosen}
        isTrue={props.correctAnswer === opt.option}
        handleClick={() => props.handleClick(props.id, opt.option)}
        checkAnswers={props.checkAnswers}
        />})

    return (
        <div className="question">
            <h3>{props.question}</h3>
            <div className="options">
                {allOptions}
            </div>
            <hr></hr>
        </div>
    )
}