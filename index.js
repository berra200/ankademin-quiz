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

// Saves the selected value when navigating through the questions
function navigation(btn){
    // questions[currentQuestion].answer = ""; // Empty old answers

    if (questions[currentQuestion].type === "true/false" && document.querySelector(".selected")){
        // Loop through all selected items and save its value
        questions[currentQuestion].answer = document.querySelector(".selected").innerText;
    }else if(questions[currentQuestion].type === "multiple choice" && document.querySelector("[name='radioAnswer']:checked")){
        questions[currentQuestion].answer = document.querySelector("[name='radioAnswer']:checked").value;
    }else if (questions[currentQuestion].type === "checkbox"){
        questions[currentQuestion].answer.length = 0;
        document.querySelectorAll("[name='checkboxAnswer']:checked").forEach(e => {
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
            if (questions[currentQuestion].answer === "Falskt"){
                falseBtn.classList.add("selected");
            }else if (questions[currentQuestion].answer === "Sant"){
                trueBtn.classList.add("selected");
            }

            contentWrapper.append(falseBtn, trueBtn);
        }else if (questions[currentQuestion].type === "multiple choice"){ // Questions with 4 alternative but 1 correct answer
            let radioBtn = document.createElement("var");
            radioBtn.innerHTML = `
            <div class="answer-container">
                <div>
                    <label for="1">${questions[currentQuestion].posibleAnswers[0]}</label>
                    <input type="radio" name="radioAnswer" value="${questions[currentQuestion].posibleAnswers[0]}">
                </div>
                <div>
                    <label for="2">${questions[currentQuestion].posibleAnswers[1]}</label>
                    <input type="radio" name="radioAnswer" value="${questions[currentQuestion].posibleAnswers[1]}">
                </div>
            </div>
            <div class="answer-container">
                <div>
                    <label for="3">${questions[currentQuestion].posibleAnswers[2]}</label>
                    <input type="radio" name="radioAnswer" value="${questions[currentQuestion].posibleAnswers[2]}">
                </div>
                <div>
                    <label for="4">${questions[currentQuestion].posibleAnswers[3]}</label>
                    <input type="radio" name="radioAnswer" value="${questions[currentQuestion].posibleAnswers[3]}">
                </div>
            </div>`
            contentWrapper.append(radioBtn);

            // Check if there are any saved answers and check the correct box
            let checkbox = document.querySelectorAll("[name='radioAnswer']")
            checkbox.forEach(e => {
                if (questions[currentQuestion].answer === e.value){
                    e.checked = true;
                }
            })
        }else if (questions[currentQuestion].type === "checkbox"){ // Questions witch 1-3 correct answers
            let checkboxes = document.createElement("var");
            checkboxes.innerHTML = `
            <div class="answer-container">
                <div>
                    <label for="1">${questions[currentQuestion].posibleAnswers[0]}</label>
                    <input type="checkbox" name="checkboxAnswer" value="${questions[currentQuestion].posibleAnswers[0]}">
                </div>
                <div>
                    <label for="2">${questions[currentQuestion].posibleAnswers[1]}</label>
                    <input type="checkbox" name="checkboxAnswer" value="${questions[currentQuestion].posibleAnswers[1]}">
                </div>
            </div>
            <div class="answer-container">
                <div>
                    <label for="3">${questions[currentQuestion].posibleAnswers[2]}</label>
                    <input type="checkbox" name="checkboxAnswer" value="${questions[currentQuestion].posibleAnswers[2]}">
                </div>
                <div>
                    <label for="4">${questions[currentQuestion].posibleAnswers[3]}</label>
                    <input type="checkbox" name="checkboxAnswer" value="${questions[currentQuestion].posibleAnswers[3]}">
                </div>
            </div>`
            contentWrapper.append(checkboxes);

            // Check if there are any saved answers and check the correct box
            let checkbox = document.querySelectorAll("[name='checkboxAnswer']")
            checkbox.forEach(e => {
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
        nextBtn.innerText = "Nästa";
        nextBtn.addEventListener("click", function() { navigation(this) });

        contentWrapper.append(prevBtn, nextBtn);
    }
}
// End of main quiz function





// Notes and saved stuff for later use

// Use this to get selected button on true or false questions
// console.log(document.querySelector(".selected").innerText);

