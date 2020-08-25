const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion={}
let acceptingAnswers=true
let score=0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Which country has been the most affected during Covid-19 crisis?',
        choice1: 'Russia',
        choice2: 'India',
        choice3: 'United States Of America',
        choice4: 'Brazil',
        answer: 3,
    },
    {
        question:
            "Which country has created the first vaccine for Covid-19?",
        choice1: "France",
        choice2: "Russia",
        choice3: "New Zealand",
        choice4: "None of the above",
        answer: 2,
    },
    {
        question: "How many Covid-19 cases (approximately) have been reported in India till now?",
        choice1: "0-10000",
        choice2: "500-800 thousand",
        choice3: "1-2 million",
        choice4: "2.5-3.5 million",
        answer: 4,
    },
    {
        question: "Which of the following is a symptom of Covid-19?",
        choice1: "Back Pain",
        choice2: "Blurry eyes",
        choice3: "Fever",
        choice4: "Joint pains",
        answer: 3,
    },
    {
        question: "Can mosquitoes or ticks spread the virus that causes Covid-19?",
        choice1: "Yes",
        choice2: "No",
        choice3: "No data as of now",
        choice4: "Mosquitoes and ticks are extinct",
        answer: 3,
    },
    {
        question: "How many Covid-19 cases (approximately) have been reported in USA till now?",
        choice1: "5.5-6 million",
        choice2: "7.5-8 million",
        choice3: "2-3 million",
        choice4: "1.8-2.2 million",
        answer: 1,
    },
    {
        question: "Which age group has been the most affected by Covid-19?",
        choice1: "40-49",
        choice2: "60-69",
        choice3: "30-39",
        choice4: "80+",
        answer: 4,
    },
    {
        question: "Which of the following countries have zero reported cases of Covid-19?",
        choice1: "Turkey",
        choice2: "North Korea",
        choice3: "Myanmar (Burma)",
        choice4: "None of the Above",
        answer: 2,
    },
    {
        question: "How many Covid-19 cases (approximately) have been reported in Brazil till now?",
        choice1: "4-4.5 million",
        choice2: "2-2.5 million",
        choice3: "1.5-1.8 million",
        choice4: "3.5-4 million",
        answer: 4,
    },
    {
        question: "In which month was the 1st novel Coronavirus death reported?",
        choice1: "January, 2020",
        choice2: "December, 2019",
        choice3: "February, 2020",
        choice4: "None of the Above",
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()


