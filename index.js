// Questions
const questions = [
    {
        heading: "Fråga 1",
        question: "Är jordnöten en nöt?",
        rightAnswer: "false",
        type: "true/false",
        answer: "",
    },
    {
        heading: "Fråga 2",
        question: "Vad är en rotfrukt?",
        posibleAnswers: ["Kiwi", "Ananas", "potatis", "Mango"],
        rightAnswer: "Kiwi",
        type: "multiple choice",
        answer: "",
    },
    {
        heading: "Fråga 3",
        question: "Vad brukar man i folkmun normalt inte jämnföra?",
        posibleAnswers: ["Äpple", "Päron", "Banan", "Apelsin"],
        rightAnswer: ["Äpple", "Päron"],
        type: "checkbox",
        answer: "",
    },
];


// Start of code ---------------------------------------------------------------

// Variables
let contentWrapper = document.querySelector("#contentWrapper");
let questionDiv = document.querySelector("#questionDiv");

let currentQuestion = 0;



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
    if(currentQuestion >= questions.length){
        let newH3 = document.createElement("h3");
        newH3.innerText = "Slut";
        contentWrapper.append(newH3);
    }else{
        // Create heading
        let newH3 = document.createElement("h3");
        newH3.innerText = questions[currentQuestion].heading;
        contentWrapper.append(newH3);
    
        // Create question
        let newP = document.createElement("p");
        newP.innerText = questions[currentQuestion].question;
        contentWrapper.append(newP);
    
        // Create possible answers
        if (questions[currentQuestion].type === "true/false"){
            // False button
            let falseBtn = document.createElement("button");
            falseBtn.innerText = "Falskt";
            falseBtn.style.backgroundColor = "red";
            falseBtn.classList = "true-false-btn";
            
            // True button
            let trueBtn = document.createElement("button");
            trueBtn.innerText = "Sant";
            trueBtn.style.backgroundColor = "green";
            trueBtn.classList = "true-false-btn";

            contentWrapper.append(falseBtn, trueBtn);
        }else if (questions[currentQuestion].type === "multiple choice"){
            let radioBtn = document.createElement("var");
            radioBtn.innerHTML = `
            <div class="answer-container">
                <div>
                    <label for="1">${questions[currentQuestion].posibleAnswers[0]}</label>
                    <input type="radio" name="radioAnswer" id="1">
                </div>
                <div>
                    <label for="2">${questions[currentQuestion].posibleAnswers[1]}</label>
                    <input type="radio" name="radioAnswer" id="2">
                </div>
            </div>
            <div class="answer-container">
                <div>
                    <label for="3">${questions[currentQuestion].posibleAnswers[2]}</label>
                    <input type="radio" name="radioAnswer" id="3">
                </div>
                <div>
                    <label for="4">${questions[currentQuestion].posibleAnswers[3]}</label>
                    <input type="radio" name="radioAnswer" id="4">
                </div>
            </div>`
            contentWrapper.append(radioBtn);
        }else if (questions[currentQuestion].type === "checkbox"){
            let checkboxes = document.createElement("var");
            checkboxes.innerHTML = `
            <div class="answer-container">
                <div>
                    <label for="1">${questions[currentQuestion].posibleAnswers[0]}</label>
                    <input type="checkbox" name="radioAnswer" id="1">
                </div>
                <div>
                    <label for="2">${questions[currentQuestion].posibleAnswers[1]}</label>
                    <input type="checkbox" name="radioAnswer" id="2">
                </div>
            </div>
            <div class="answer-container">
                <div>
                    <label for="3">${questions[currentQuestion].posibleAnswers[2]}</label>
                    <input type="checkbox" name="radioAnswer" id="3">
                </div>
                <div>
                    <label for="4">${questions[currentQuestion].posibleAnswers[3]}</label>
                    <input type="checkbox" name="radioAnswer" id="4">
                </div>
            </div>`
            contentWrapper.append(checkboxes);
        }
        
        
        // Create navigation buttons
        let prevBtn = document.createElement("button");
        prevBtn.id = "backBtn";
        prevBtn.innerText = "Tillbaka";
        prevBtn.addEventListener("click", () => {
            currentQuestion--;
            quiz()
        })
        if (currentQuestion === 0){ // If first question dont show back button
            prevBtn.style.visibility = "hidden";
        }
        
        let nextBtn = document.createElement("button");
        nextBtn.id = "nextBtn";
        nextBtn.innerText = "Nästa";
        nextBtn.addEventListener("click", () => {
            currentQuestion++;
            quiz()
        })
        contentWrapper.append(prevBtn, nextBtn);
    }
}
// End of main quiz function

