const question = document.getElementById('question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.getElementById('progressiontText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

//initialized variables
let currentQuestion = {}
let acceptingAnswers = true
let score = 0 
let questionCounter = 0 
let availableQuestions = {}

//Setup questions Arry
let questions = [
     "sports", { 
        question: 'Sports',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',   
        answer: 2,
    },
    { 
        question: 'Sports',
        choice1: 'Dubai',
        choice2: 'New York',
        choice3: 'Shanghai',
        choice4: 'None of the above',   
        answer: 1,
    },
    { 
        question: 'Sports',
        choice1: '20%',
        choice2: '18%',
        choice3: '7%',
        choice4: '33%',   
        answer: 3,
    },
    { 
        question: 'Sports',
        choice1: '10-20%',
        choice2: '5-10%',
        choice3: '15-20%',
        choice4: '30-40%',   
        answer: 1,
    },
    "movies",  { 
        question: 'Movies',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',   
        answer: 2,
    },
    { 
        question: 'Movies',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',   
        answer: 2,
    },
    { 
        question: 'Movies',
        choice1: '2',
        choice2: '4',
        choice3: '21',
        choice4: '17',   
        answer: 2,
    },
]

//Defining Constants
const SCORE_POINTS = 100 
const MAX_QUESTIONS = 4

//Function starts the game when the page has loaded
let startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}
document.addEventListener('DOMContentLoaded', startGame);

//When A questions is answered gets new question
let getNewQuestion = () => { 
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
        localStorage.setItem('lastGame', "sports")

        return window.location.assign('/end.html')
     }
        questionCounter++
        progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
        progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

        const questionIndex = Math.floor(Math.random() * availableQuestions.length)
        currentQuestion = availableQuestions[questionIndex]
        question.innerText = currentQuestion.question

        choices.forEach(choice => { 
            const number = choice.dataset['number']
            choice.innerText = currentQuestion['choice' + number]
        })

        availableQuestions.splice(questionIndex, 1)

        acceptingAnswers = true
}

//listens for correct answer
choices.forEach(choice => { 
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false 
        const selectedChoice = e.target
        const slectedAnswer = parseInt(selectedChoice.dataset['number']);
        console.log(slectedAnswer, currentQuestion.answer)
        
        let classToApply = slectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if(classToApply === 'correct') { 
            score += SCORE_POINTS
            scoreText.innerText = score
            console.log(score)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => { 
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})