// Getting all required elements
const startBtn = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const exitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz-box");
const optionList = document.querySelector(".option-list");
const timerCount = quizBox.querySelector(".timer .timer-sec");
const timeLine = quizBox.querySelector(".time-line");
const timeOff = quizBox.querySelector(".timer-text");

// If start Quiz button clicked
startBtn.onclick = () => {
    infoBox.classList.add("active-info"); // Show the info box
};

// If exit Quiz button clicked
exitBtn.onclick = () => {
    infoBox.classList.remove("active-info"); // Hide the info box
};

// If continue Quiz button clicked
continueBtn.onclick = () => {
    infoBox.classList.remove("active-info"); // Hide the info box
    quizBox.classList.add("active-quiz"); // Show the Quiz box
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
};

let queCount = 0;
let queNumb = 1;
let counter;
let timeValue = 15;
let widthValue = 0;
let counterLine;
let userScore = 0;

const nextBtn = quizBox.querySelector(".next-btn");
const resultBox = document.querySelector(".result-box");
const restartQuiz = resultBox.querySelector(".buttons .restart");
const quitQuiz = resultBox.querySelector(".buttons .quit");

restartQuiz.onclick = () => {
    resultBox.classList.remove("active-result");
    quizBox.classList.add("active-quiz");
    queCount = 0;
    queNumb = 1;
    timeValue = 15;
    widthValue = 0;
    userScore = 0;
    showQuestions(queCount);
    queCounter(queNumb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    nextBtn.style.display = "none";
};

quitQuiz.onclick = () => {
    window.location.reload();
};

// If next button clicked
nextBtn.onclick = () => {
    if (queCount < questions.length - 1) {
        queCount++;
        queNumb++;
        showQuestions(queCount);
        queCounter(queNumb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        nextBtn.style.display = "none";
        timeOff.textContent = `Time Left`;
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        showResultBox();
    }
};

// Getting questions, options from array
function showQuestions(index) {
    const queText = document.querySelector(".que-text");
    let queTag = `<span>${questions[index].numb}. ${questions[index].question}</span>`;
    let optionTag = "";
    for (let i = 0; i < questions[index].Options.length; i++) {
        optionTag += `<div class="option">${questions[index].Options[i]}<span></span></div>`;
    }
    queText.innerHTML = queTag;
    optionList.innerHTML = optionTag;
    const option = optionList.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIcon = `<div class="icon tick"><i class="fas fa-check"></i></div>`;
let crossIcon = `<div class="icon cross"><i class="fas fa-times"></i></div>`;

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[queCount].answer;
    let allOptions = optionList.children.length;
    if (userAns == correctAns) {
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        // If answers are incorrect, automatically select the correct answer
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAns) {
                optionList.children[i].classList.add("correct");
                optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }

    // Once User selected, disable all options
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add("disabled");
    }
    nextBtn.style.display = "block";
}

function showResultBox() {
    infoBox.classList.remove("active-info"); // Hide the info box
    quizBox.classList.remove("active-quiz"); // Hide the Quiz box
    resultBox.classList.add("active-result"); // Show the result box
    const scoreText = resultBox.querySelector(".score-text");
    let scoreTag = `<span>and sorry, You got only <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
    if (userScore > 3) {
        scoreTag = `<span>and Congrats! You got <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
    } else if (userScore > 1) {
        scoreTag = `<span>and nice, You got only <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
    }
    scoreText.innerHTML = scoreTag;
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timerCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timerCount.textContent;
            timerCount.textContent = `0${addZero}`;
        }
        if (time < 0) {
            clearInterval(counter);
            timerCount.textContent = `00`;
            timeOff.textContent = `Time Off`;

            let correctAns = questions[queCount].answer;
            let allOptions = optionList.children.length;
            for (let i = 0; i < allOptions; i++) {
                if (optionList.children[i].textContent == correctAns) {
                    optionList.children[i].classList.add("correct");
                    optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }
            for (let i = 0; i < allOptions; i++) {
                optionList.children[i].classList.add("disabled");
            }
            nextBtn.style.display = "block";
        }
    }
}

function startTimerLine(width) {
    counterLine = setInterval(timer, 29);
    function timer() {
        width += 1;
        timeLine.style.width = width + "px";
        if (width > 549) {
            clearInterval(counterLine);
        }
    }
}

function queCounter(index) {
    const bottomQueCounter = quizBox.querySelector(".total-que");
    let totalQueTag = `<span><p>${index}</p>of<p>${questions.length}</p>Question</span>`;
    bottomQueCounter.innerHTML = totalQueTag;
}
