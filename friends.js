const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions= [
    {
        question: 'What is name of Ross"s pet ? ',
        choice1: 'Albert',
        choice2: 'Marcel',
        choice3: 'Emma',
        choice4: 'Tommy',
        answer: 2,
    },
    {
        question: 'What is the name of Joeys penguin? ',
        choice1: 'Hugsy',
        choice2: 'Huggy',
        choice3: 'Snowy',
        choice4: 'Piggy',
        answer: 1,
    },
    {
        question: 'What is the name of Phoebes favourite song? ',
        choice1: 'Smelly Dog',
        choice2: 'Smelly Bat',
        choice3: 'Sticky Shoe',
        choice4: 'Smelly Cat',
        answer: 4,
    },
    {
        question: 'Joey never shares....? ',
        choice1: 'His food',
        choice2: 'His books',
        choice3: 'His bed',
        choice4: 'His hugsy',
        answer: 1,
    }
];

const score_Points=100
const max = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter>max)
    {
        localStorage.setItem('mostRecentScore',score)
        return window.location.assign('/end.html')
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${max}`;
    progressBarFull.style.width = `${(questionCounter/max) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion= availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex,1)

    acceptingAnswers=true
}
choices.forEach(choice => {
    choice.addEventListener('click',e =>{
        if(!acceptingAnswers) return

        acceptingAnswers=false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct')
        {
            incrementScore(score_Points)

        }
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        },1000)
    })      
})

incrementScore = num =>{
    score +=num
    scoreText.innerText = score
}

startGame()