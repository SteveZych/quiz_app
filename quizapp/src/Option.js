import React from 'react'

export default function Option(props){
    let styles = {}
    if (props.checkAnswers){
        if (props.isTrue){
            styles={
                //green
                backgroundColor: '#94D7A2'
            }
        }
        if (props.isChosen && !props.isTrue){
            styles={
                //red
                backgroundColor: '#F8BCBC'
            }
        }
        if (!props.isChosen && !props.isTrue){
            styles={
                // grayed out
                backgroundColor: '#F5F7FB'
            }
        }
        
    }else{
        styles={
            backgroundColor: props.selected === props.option ? '#D6DBF5': '#F5F7FB'
        }
    }
    

    return(
        <button className="option" 
        onClick={props.handleClick} 
        style={styles}>
            {props.option}
        </button>
    )
}