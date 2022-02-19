import React from "react"
import Quiz from './Quiz'
import {nanoid} from 'nanoid'

export default function App() {
    const [quizData, setQuizData] = React.useState([])
    const [checkAnswers, setCheckAnswers] = React.useState(false)
    const [rounds, setRounds] = React.useState({correct: 0, guessed: 0})
    const [playAgain, setPlayAgain] = React.useState(false)

    React.useEffect(function() {
      fetch("https://opentdb.com/api.php?amount=5&difficulty=easy")
          .then(res => res.json())
          .then(data => setQuizData(data.results.map(quiz => quizObject(quiz))))
    }, [playAgain])
    
    function quizObject(quiz){
      return {
        id: nanoid(),
        selected: "",
        question: quiz.question,
        difficulty: quiz.difficulty,
        type: quiz.type,
        category: quiz.category,
        correct_answer: quiz.correct_answer,
        allOptions: [...quiz.incorrect_answers, quiz.correct_answer].map(option => {
          return {option: option, isChosen: false}
        }).sort(() => Math.random() - 0.5)
      }
    }

    const mappedData = quizData.map(quiz => {
      return <Quiz 
      key={quiz.id}
      id={quiz.id}
      selected={quiz.selected}
      question={quiz.question}
      correctAnswer={quiz.correct_answer}
      allOptions={quiz.allOptions}
      handleClick={handleClick}
      checkAnswers={checkAnswers}
      />
    })

    function handleClick(id, option){
      setQuizData(prevQuizData => prevQuizData.map(quiz => {
        return quiz.id === id ? 
        {...quiz, 
          selected: option,
          allOptions: quiz.allOptions.map(opt => {
            return opt.option === option ?
            {
              ...opt,
              isChosen: !opt.isChosen
            }
            : {...opt, isChosen: false}
          })
      } 
        : quiz
      }))
    }

    function sumAnswers(){
      quizData.map(quiz => {
        if (quiz.selected === quiz.correct_answer){
          setRounds(prevRounds => {
            return {...prevRounds, correct: prevRounds.correct + 1, guessed: prevRounds.guessed + 1}})
        }else {
          setRounds(prevRounds =>{
            return {...prevRounds, guessed: prevRounds.guessed + 1}
          })
        }
      })
    }

    function check(){
      sumAnswers()
      setCheckAnswers(true)
    }

    function resetGame(){
      setPlayAgain(prevPlayAgain => !prevPlayAgain)
      setCheckAnswers(prevCheckAnswers => !prevCheckAnswers)
      setRounds({correct: 0, guessed: 0})
    }

    return (
      <div className="content">
        <div>
            {mappedData}
        </div>
        {checkAnswers && <h4>Your score: {rounds.correct}/{rounds.guessed}</h4>}
        {checkAnswers ? 
        <button onClick={() => resetGame()}>Play Again!</button>
         : <button onClick={() => check()}>Check Answers</button>}
      </div>
        
    )
}

