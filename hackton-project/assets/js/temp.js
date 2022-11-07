//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let userScore = document.getElementById("user-score");
let startButton = document.getElementById("start-button");
let ladderDiv = document.querySelector('.ladder-div');
let car = document.querySelector('.car');
let endQuizBtn = document.querySelector('.end-quiz-btn');
let questionCount;
let scoreCount = 0;
let count = 20;
let countdown;


//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //take user to result page
            setScore();
            window.location = 'result.html';
           
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 20;
            clearInterval(countdown);
            timerDisplay();
            showLadderDiv();
        }
    })
);

// End Quiz button 
endQuizBtn.addEventListener('click', (
    () => {
        setScore();
        window.location = 'result.html';
    }
))


// set user score and redirect to result page
function setScore(){
    localStorage.setItem("quantum_score", JSON.parse(scoreCount));
    console.log(scoreCount);
}

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);


        //algorithm for randomizing the options value
        let randNum = Math.floor(Math.random() * 3);


        if (randNum == 0) {
            div.innerHTML += `
        <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
         <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
          <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
           <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
        `;
        } else if (randNum == 1) {
            div.innerHTML += `
        <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
            <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
            <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
            <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
        `;
        } else if (randNum == 2) {
            div.innerHTML += `
            <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
                <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
                <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
                <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
            `;
        }


        quizContainer.appendChild(div);
    }
}



//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 20;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

// start quiz when window load complete

window.onload = () => {
    initial();
}

// list of car animation points
let carAnimStyle = ['-460px', '-345px', '-215px', '-87px', '32px', '130px', '220px', '330px', '450px', '590px'];

// show climbing  object when next btn is clicked 
function showLadderDiv() {
    let car = document.querySelector('.car');

    ladderDiv.style.marginLeft = '0';
    nextBtn.style.pointerEvents = 'none';
    setTimeout(() => {
        car.style.marginBottom = `${carAnimStyle[questionCount]}`;
    }, 500);

    setTimeout(() => {
        ladderDiv.style.marginLeft = '-50vw';
        nextBtn.style.pointerEvents = '';
    }, 2000);

}

setTimeout(() => {
    ladderDiv.style.marginLeft = '-50vw';
    nextBtn.style.pointerEvents = '';
    car.classList.remove('moveIn');
}, 2500);


