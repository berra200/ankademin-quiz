// Questions
const questions = [
    {
        heading: "Fråga 1",
        question: "Är jordnöten en nöt?",
        rightAnswer: "Falskt",
        type: "true/false",
        answer: [],
    },
    {
        heading: "Fråga 2",
        question: "Vad är en rotfrukt?",
        posibleAnswers: ["Kiwi", "Ananas", "Potatis", "Mango"],
        rightAnswer: "Potatis",
        type: "multiple choice",
        answer: [],
    },
    {
        heading: "Fråga 3",
        question: "Vad brukar man i folkmun normalt inte jämnföra?",
        posibleAnswers: ["Äpple", "Päron", "Banan", "Apelsin"],
        rightAnswer: ["Äpple", "Päron"],
        type: "checkbox",
        answer: [],
    },
    {
        heading: "Fråga 4",
        question: "Vad brukar man i folkmun normalt inte jämnföra?",
        posibleAnswers: ["Äpple", "Päron", "Banan", "Apelsin"],
        rightAnswer: ["Äpple", "Päron"],
        type: "checkbox",
        answer: [],
    },
    {
        heading: "Fråga 5",
        question: "Vad brukar man i folkmun normalt inte jämnföra?",
        posibleAnswers: ["Äpple", "Päron", "Banan", "Apelsin"],
        rightAnswer: ["Äpple", "Päron"],
        type: "checkbox",
        answer: [],
    },
    {
        heading: "Fråga 6",
        question: "Vad brukar man i folkmun normalt inte jämnföra?",
        posibleAnswers: ["Äpple", "Päron", "Banan", "Apelsin"],
        rightAnswer: ["Äpple", "Päron"],
        type: "checkbox",
        answer: [],
    },
    {
        heading: "Fråga 7",
        question: "Vad brukar man i folkmun normalt inte jämnföra?",
        posibleAnswers: ["Äpple", "Päron", "Banan", "Apelsin"],
        rightAnswer: ["Äpple", "Päron"],
        type: "checkbox",
        answer: [],
    },
    {
        heading: "Fråga 8",
        question: "Vad brukar man i folkmun normalt inte jämnföra?",
        posibleAnswers: ["Äpple", "Päron", "Banan", "Apelsin"],
        rightAnswer: ["Äpple", "Päron"],
        type: "checkbox",
        answer: [],
    },
    {
        heading: "Fråga 9",
        question: "Vad brukar man i folkmun normalt inte jämnföra?",
        posibleAnswers: ["Äpple", "Päron", "Banan", "Apelsin"],
        rightAnswer: ["Äpple", "Päron"],
        type: "checkbox",
        answer: [],
    },
    {
        heading: "Fråga 10",
        question: "Vad brukar man i folkmun normalt inte jämnföra?",
        posibleAnswers: ["Äpple", "Päron", "Banan", "Apelsin"],
        rightAnswer: ["Äpple", "Päron"],
        type: "checkbox",
        answer: [],
    },
];


// Start of code ---------------------------------------------------------------

// Variables
let contentWrapper = document.querySelector("#contentWrapper");
let questionDiv = document.querySelector("#questionDiv");

let currentQuestion = 0;



// Small functions so i dont have to repeat the code

// set class to the selected button
function trueFalseSelected(btn) {
    document.querySelectorAll(".selected").forEach(element => {element.classList.remove("selected")});
    btn.classList.add("selected");
}

// Sort array and make it to a string then compare them and return true or false
function arrayEquals(arr1, arr2){
    arr1.sort();
    arr1 = arr1.toString();
    arr2.sort();
    arr2 = arr2.toString();
    return arr1 === arr2;
}

// Saves the selected value when navigating through the questions
function navigation(btn){
    if (questions[currentQuestion].type === "true/false" && document.querySelector(".selected")){
        // Loop through all selected items and save its value
        questions[currentQuestion].answer[0] = document.querySelector(".selected").innerText;
    }else if(questions[currentQuestion].type === "multiple choice" && document.querySelector("[name='inputAnswer']:checked")){
        questions[currentQuestion].answer.push(document.querySelector("[name='inputAnswer']:checked").value);
    }else if (questions[currentQuestion].type === "checkbox"){
        questions[currentQuestion].answer.length = 0;
        document.querySelectorAll("[name='inputAnswer']:checked").forEach(e => {
            questions[currentQuestion].answer.push(e.value);
        })
    }


    // Decide if user wants to go to next xuestion or previous one
    if (btn.id === "nextBtn"){
        currentQuestion++;
    }else{
        currentQuestion--;
    }

    // Run the quiz function again
    quiz();
    
}



// Welcome message when landing on this website
let newH3 = document.createElement("h3");;
newH3.innerText = "Välkommen till Ankademins quiz!";

let newP = document.createElement("p");
newP.innerText = `Tryck på startknappen för att börja spelet
och få 10st frågor att svara på.`

let newBtn = document.createElement("button");
newBtn.innerText = "Starta quizzzet!";
newBtn.addEventListener("click", () => {
    quiz() // Run the quiz when push startbutton
});
contentWrapper.append(newH3, newP, newBtn);
// End of welcome message


// Main quiz function that loops through all questions
function quiz(){
    contentWrapper.innerHTML = "";
    if(currentQuestion < questions.length){
        // Create heading
        let newH3 = document.createElement("h3");
        newH3.innerText = questions[currentQuestion].heading;
        contentWrapper.append(newH3);
    
        // Create question
        let newP = document.createElement("p");
        newP.innerText = questions[currentQuestion].question;
        contentWrapper.append(newP);
    
        // Create possible answers
        if (questions[currentQuestion].type === "true/false"){ // True or false questions
            
            // False button
            let falseBtn = document.createElement("button");
            falseBtn.innerText = "Falskt";
            falseBtn.style.backgroundColor = "#ff726f";
            falseBtn.classList = "true-false-btn";
            falseBtn.addEventListener("click", function() { trueFalseSelected(this) });
            
            // True button
            let trueBtn = document.createElement("button");
            trueBtn.innerText = "Sant";
            trueBtn.style.backgroundColor = "lightgreen";
            trueBtn.classList = "true-false-btn";
            trueBtn.addEventListener("click", function() { trueFalseSelected(this) });

            // If already answerd, set "selected" class on the selected buttton
            if (questions[currentQuestion].answer[0] === "Falskt"){
                falseBtn.classList.add("selected");
            }else if (questions[currentQuestion].answer[0] === "Sant"){
                trueBtn.classList.add("selected");
            }

            contentWrapper.append(falseBtn, trueBtn);
        }else{
            let answerDiv = document.createElement("div");
            answerDiv.innerHTML = `
            <div class="answer-container">
                <label>
                ${questions[currentQuestion].posibleAnswers[0]}
                <input name="inputAnswer" value="${questions[currentQuestion].posibleAnswers[0]}">
                </label>
                <label>
                ${questions[currentQuestion].posibleAnswers[1]}
                <input name="inputAnswer" value="${questions[currentQuestion].posibleAnswers[1]}">
                </label>
            </div>
            <div class="answer-container">
                <label>
                ${questions[currentQuestion].posibleAnswers[2]}
                <input name="inputAnswer" value="${questions[currentQuestion].posibleAnswers[2]}">
                </label>
                <label>
                ${questions[currentQuestion].posibleAnswers[3]}
                <input name="inputAnswer" value="${questions[currentQuestion].posibleAnswers[3]}">
                </label>
            </div>`
            contentWrapper.append(answerDiv);
            
            if (questions[currentQuestion].type === "multiple choice"){
                document.querySelectorAll("[name='inputAnswer']").forEach(input => {
                    input.type = "radio";
                })
            }else{
                document.querySelectorAll("[name='inputAnswer']").forEach(input => {
                    input.type = "checkbox";
                })
            }

            // Check if there are any saved answers and check the correct box
            document.querySelectorAll("[name='inputAnswer']").forEach(e => {
                if (questions[currentQuestion].answer.includes(e.value)){
                    e.checked = true;
                }
            })
        }
        
        
        // Create navigation buttons
        let prevBtn = document.createElement("button");
        prevBtn.id = "backBtn";
        prevBtn.innerText = "Tillbaka";
        prevBtn.addEventListener("click", function() { navigation(this) });
        if (currentQuestion === 0){ // If first question dont show back button
            prevBtn.style.visibility = "hidden";
        }
        
        let nextBtn = document.createElement("button");
        nextBtn.id = "nextBtn";
        if (currentQuestion === questions.length - 1){ // If last question change text in button
            nextBtn.innerText = "Lämna in";
        }else{
            nextBtn.innerText = "Nästa";
        }
        nextBtn.addEventListener("click", function() { navigation(this) });

        contentWrapper.append(prevBtn, nextBtn);
    }else{
        // Correct answers and print out results
        let points = {
            got: 0,
            max: questions.length,
            percent: () => points.got / points.max,
        };
        
        let div = document.createElement("div");
        div.classList.add("points-container");
        let list = document.createElement("ul");
        list.classList.add("list");
        div.append(list);
        
        questions.forEach(question => {
            let li = document.createElement("li");
            if (question.answer.length !== 0){
                if (question.type === "checkbox" && arrayEquals(question.answer, question.rightAnswer)
                || question.rightAnswer.includes(question.answer)){
                    li.innerText = `${question.heading}: svarade du rätt på!`;
                    li.style.color = "green";
                    points.got++;
                }else{
                    li.innerText = `${question.heading}: svarade du fel på.`;
                    li.style.color = "red";
                }
            }else{
                li.innerText = `${question.heading}: svarade du inte på.`;
            }
            list.append(li);
        });
        
        let infoBox = document.createElement("div");
        infoBox.classList = "info-box";
        let message = document.createElement("h3");
        message.innerText = `Du fick ${points.got}/${questions.length} poäng vilket är `;
        infoBox.append(message);

        if (points.percent() > 0.75){
            infoBox.style.backgroundColor = "green";
            message.innerText += "mycket väl godkänt."
        }else if(points.percent() >= 0.5){
            infoBox.style.backgroundColor = "orange";
            message.innerText += "godkänt."
        }else{
            infoBox.style.backgroundColor = "red";
            message.innerText += "underkänt."
        }
        
        contentWrapper.append(infoBox, div);
    }
}
