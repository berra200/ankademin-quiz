
// Questions---------------------------------------------------------------------------------------

const data = [
    {
        heading: "Fråga 1",
        question: "Började halloween i Irland?",
        posibleAnswers: [],
        rightAnswer: ["Sant"],
        type: "true/false", // true/false || multiple choice || checkbox.
        answer: [],
    },
    {
        heading: "Fråga 2",
        question: 'Vad betyder ordet "Halloween"?',
        posibleAnswers: ["Dödens natt", "Helgons kväll", "Återträffsdag", "Godisdagen"],
        rightAnswer: ["Helgons kväll"],
        type: "multiple choice", // true/false || multiple choice || checkbox.
        answer: [],
    },
    {
        heading: "Fråga 3",
        question: "Vilken är den mest populära Halloween kostymen för barn 2021?",
        posibleAnswers: ["Elsa", "Spiderman", "Spöke", "Pumpa"],
        rightAnswer: ["Spiderman"],
        type: "multiple choice", // true/false || multiple choice || checkbox.
        answer: [],
    },
    {
        heading: "Fråga 4",
        question: "Vilket av dessa är traditionella Halloween dekorationer?",
        posibleAnswers: ["Kittel", "Krans", "Spindel", "Pumpa"],
        rightAnswer: ["Spindel", "Kittel", "Pumpa"],
        type: "checkbox", // true/false || multiple choice || checkbox.
        answer: [],
    },
    {
        heading: "Fråga 5",
        question: "Vilka är medlemmar i Addams-family?",
        posibleAnswers: ["Gomez", "Lurch", "Morticia", "Wednesday"],
        rightAnswer: ["Gomez", "Morticia", "Wednesday"],
        type: "checkbox", // true/false || multiple choice || checkbox.
        answer: [],
    },
    {
        heading: "Fråga 6",
        question: 'Hette godiset"Godismajs" "Hönsfoder" innan?',
        posibleAnswers: [],
        rightAnswer: ["Sant"],
        type: "true/false", // true/false || multiple choice || checkbox.
        answer: [],
    },
    {
        heading: "Fråga 7",
        question: "Vilken är den populäraste Halloween-dräkten för husdjur?",
        posibleAnswers: ["Spindelmannen", "Pumpa", "Häxa", "Jinker bell"],
        rightAnswer: ["Pumpa"],
        type: "multiple choice", // true/false || multiple choice || checkbox.
        answer: [],
    },
    {
        heading: "Fråga 8",
        question: 'Anordnas USAs största halloweenparaden i Texas?',
        posibleAnswers: [],
        rightAnswer: ["Falskt"],
        type: "true/false", // true/false || multiple choice || checkbox.
        answer: [],
    },
    {
        heading: "Fråga 9",
        question: 'Vem skrev "The Legend of Sleepy Hollow"?',
        posibleAnswers: ["Washington Irving", "Stephen King", "Agatha Christie", "Henry James"],
        rightAnswer: ["Washington Irving"],
        type: "multiple choice", // true/false || multiple choice || checkbox.
        answer: [],
    },
    {
        heading: "Fråga 10",
        question: "Var ligger Transsylvanien, annars känd som greve Draculas hem?",
        posibleAnswers: ["Noth Carolina", "Rumänien", "Irland", "Alaska"],
        rightAnswer: ["Rumänien"],
        type: "multiple choice", // true/false || multiple choice || checkbox.
        answer: [],
    },
];




// Variables---------------------------------------------------------------------------------------

let contentWrapper = document.querySelector("#contentWrapper");
let questionDiv = document.querySelector("#questionDiv");

let currentQuestion = 0;  //Counts and remember what question thats showing.
let darkmode = true;
let questions = JSON.parse(JSON.stringify(data)); // Deep-clones the data variable so nothing changes the questions and its easy to reset the quiz.




// Functions---------------------------------------------------------------------------------------

// set class to the selected button when its true or false questions. The class makes the button look "selected".
function trueFalseSelected(btn) {
    document.querySelectorAll(".selected").forEach(element => {element.classList.remove("selected")});
    btn.classList.add("selected");
}



// Sorts array and make it to a string then compare them and return true or false.
function arrayEquals(arr1, arr2){
    arr1.sort();
    arr1 = arr1.toString();
    arr2.sort();
    arr2 = arr2.toString();
    return arr1 === arr2;
}



// Saves the selected value when navigating through the questions.
function navigation(btn){
    if (questions[currentQuestion].type === "true/false" && document.querySelector(".selected")){ // If true/false question and something is selected.
        questions[currentQuestion].answer[0] = document.querySelector(".selected").innerText;
    }else if(questions[currentQuestion].type === "multiple choice" && document.querySelector("[name='inputAnswer']:checked")){ // If multiple choice question and something is selected.
        questions[currentQuestion].answer.push(document.querySelector("[name='inputAnswer']:checked").value);
    }else if (questions[currentQuestion].type === "checkbox"){ // If checkbox question.
        questions[currentQuestion].answer.length = 0;
        // Loop through all selected items and save its value inside the question object.
        document.querySelectorAll("[name='inputAnswer']:checked").forEach(checkbox => {
            questions[currentQuestion].answer.push(checkbox.value);
        })
    }

    // Decide if user wants to go to next question or previous one.
    if (btn.id === "nextBtn"){
        currentQuestion++;
    }else{
        currentQuestion--;
    }

    quiz(); // Run the quiz function again with a new question.
}



// Changes class on body and icon inside button depending on dar or light theme.
function darkmodeBtn(){
    let darkmodeBtn = document.querySelector("#darkmodeBtn")
    if (darkmode){
        document.body.className = "lightmode";
        darkmodeBtn.innerText = "☽";
        darkmode = false;
    }else{
        document.body.className = "darkmode";
        darkmodeBtn.innerText = "☼";
        darkmode = true;
    }   
}



// Reset the game without loosing dark/light-mode.
function resetBtn(){
    currentQuestion = 0;
    questions = JSON.parse(JSON.stringify(data)); // Make a new deep-clone and write over previous answers.
    welcomeMsg();
}



// Clear screen when posting new content
function clearScreen(){
    contentWrapper.innerHTML = "";
}


// Start of actual program code--------------------------------------------------------------------

// Welcome message when landing on this website.
welcomeMsg(); // Runs the welcome message function. Its a function so that i can reset the game by running this function again.
function welcomeMsg(){
    clearScreen()
    let newH2 = document.createElement("h2");;
    newH2.innerText = `

    Välkommen till Ankademins 
    halloween quiz!`;
    newH2.style.color = "darkorange";
    
    let newP = document.createElement("p");
    newP.innerText = `Tryck på startknappen för att börja spelet
    och få ${questions.length}st frågor att svara på.`
    
    let newBtn = document.createElement("button");
    newBtn.innerText = "Starta quizzzet!";
    newBtn.addEventListener("click", () => {
        currentQuestion = 0;
        quiz() // Run the quiz when push startbutton
    });
    contentWrapper.append(newH2, newP, newBtn);
}



// Main quiz function that loops through one question at a time and also show statistics after last question.
function quiz(){
    clearScreen()
    if(currentQuestion < questions.length){ // If there are questions left otherwise end the game.
        // Create heading.
        let newH3 = document.createElement("h3");
        newH3.innerText = questions[currentQuestion].heading;
        contentWrapper.append(newH3);
    
        // Create question.
        let newP = document.createElement("p");
        newP.innerText = questions[currentQuestion].question;
        contentWrapper.append(newP);
    
        // Create possible answers.
        if (questions[currentQuestion].type === "true/false"){ // True or false questions.
            
            // False button.
            let falseBtn = document.createElement("button");
            falseBtn.innerText = "Falskt";
            falseBtn.style.backgroundColor = "#ff726f";
            falseBtn.classList = "true-false-btn";
            falseBtn.addEventListener("click", function() { trueFalseSelected(this) }); // When clicked sets the "selected" class on this button.
            
            // True button.
            let trueBtn = document.createElement("button");
            trueBtn.innerText = "Sant";
            trueBtn.style.backgroundColor = "lightgreen";
            trueBtn.classList = "true-false-btn";
            trueBtn.addEventListener("click", function() { trueFalseSelected(this) }); // When clicked sets the "selected" class on this button.

            // If already answerd, set "selected" class on the selected buttton.
            if (questions[currentQuestion].answer[0] === "Falskt"){
                falseBtn.classList.add("selected");
            }else if (questions[currentQuestion].answer[0] === "Sant"){
                trueBtn.classList.add("selected");
            }

            contentWrapper.append(falseBtn, trueBtn);
        }else{ // If the question is a multiple choice or a checkbox type.
            let answerDiv = document.createElement("div"); // Create a empty div,
            // and place the labels with answer inputs inside it.
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
            
            // Check if the buttons are supposed to be checkboxes or radio.
            if (questions[currentQuestion].type === "multiple choice"){
                document.querySelectorAll("[name='inputAnswer']").forEach(input => {
                    input.type = "radio";
                })
            }else{
                document.querySelectorAll("[name='inputAnswer']").forEach(input => {
                    input.type = "checkbox";
                })
            }

            // Check if there are any saved answers and check the correct box.
            document.querySelectorAll("[name='inputAnswer']").forEach(e => {
                if (questions[currentQuestion].answer.includes(e.value)){
                    e.checked = true;
                }
            })
        }
        
        
        // Create navigation buttons.
        let prevBtn = document.createElement("button");
        prevBtn.id = "backBtn";
        prevBtn.innerText = "Tillbaka";
        prevBtn.addEventListener("click", function() { navigation(this) }); // On click run navigation function.
        if (currentQuestion === 0){ // If first question dont show previous button.
            prevBtn.style.visibility = "hidden";
        }
        
        let nextBtn = document.createElement("button");
        nextBtn.id = "nextBtn";
        if (currentQuestion === questions.length - 1){ // If last question change text in button.
            nextBtn.innerText = "Lämna in";
        }else{
            nextBtn.innerText = "Nästa";
        }
        nextBtn.addEventListener("click", function() { navigation(this) }); // On click run navigation function.

        contentWrapper.append(prevBtn, nextBtn);
    }else{ // If there are no more questions run the "end game" with statistics and show the right answers.
        // Correct the answers and print out results.
        let points = { // Create a points object to save the data.
            got: 0,
            max: questions.length,
            percent: () => points.got / points.max, // Calculates the percentage of right answerd questions.
        };
        
        // Create a div with a "description list" inside.
        let div = document.createElement("div");
        div.classList.add("points-container");
        let list = document.createElement("dl");
        list.classList.add("list");
        div.append(list);
        
        // Loop through all questions and make a "term" and "description" for each question.
        questions.forEach(question => {
            let term = document.createElement("dt");
            let youAnswerd = document.createElement("dd");
            let rightAnswers = document.createElement("dd");
            if (question.answer.length !== 0){ // If the question is answerd.
                if (arrayEquals(question.answer, question.rightAnswer)){ // If the user answerd correct print out "Correct" and make the term green.
                    term.innerText = `${question.heading}:  Rätt!`;
                    term.style.color = "green";
                    points.got++;
                }else{ // Else print out "Wrong", make the term red and then print out the correct answers inside the description tag.
                    term.innerText = `${question.heading}:  Fel.`;
                    term.style.color = "red";
                    youAnswerd.innerText += "Du svarade: ";
                    question.answer.forEach((answer) => { youAnswerd.innerText += answer + ", " })
                    youAnswerd.innerText = youAnswerd.innerText.substring(0, youAnswerd.innerText.length - 2); // Remove the ", " on the end and replace it with a "." and a new row.
                    youAnswerd.innerHTML += `.
                    `;
                }
            }else{ // If the question is unanswerd print out "No answer".
                term.innerText = `${question.heading}: svarade du inte på.`;
            }

            // Then add the correct answer to the description tag.
            rightAnswers.innerText += "Rätt svar var: ";
            question.rightAnswer.forEach(rightAnswer => rightAnswers.innerText += rightAnswer + ", ")
            rightAnswers.innerText = rightAnswers.innerText.substring(0, rightAnswers.innerText.length - 2); // Remove the ", " on the end and replace it with a "." and a new row.
            rightAnswers.innerText += `.
            
            `;

            list.append(term, youAnswerd, rightAnswers); // Append all list items to the list witch is then appended to the points-container div.
        });
        
        // Create a colored box with the score.
        let infoBox = document.createElement("div");
        infoBox.classList = "info-box";
        let grade = "";
        
        if (points.percent() > 0.75){ // If more then 75% right answers
            infoBox.style.backgroundColor = "green";
            grade = "mycket väl godkänt";
        }else if(points.percent() >= 0.5){ // If more then or equal to 50% and less then or equal to 75% right answers.
            infoBox.style.backgroundColor = "orange";
            grade = "godkänt";
        }else{ // If less then 50% right answers
            infoBox.style.backgroundColor = "red";
            grade = "underkänt";
        }
        
        // Print out the score and the grade inside the colored infobox.
        infoBox.append(document.createElement("h3").innerText = `Du fick ${points.got}/${questions.length} poäng vilket är ${grade}.`);

        contentWrapper.append(infoBox, div); // Append the infobox and the points-container div with the list inside.
    }
}
// Repeat! :)