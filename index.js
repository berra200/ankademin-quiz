// Questions
const data = [
    {
        heading: "Fråga 1",
        question: "Började halloween i Irland?",
        rightAnswer: ["Sant"],
        type: "true/false",
        answer: [],
    },
    {
        heading: "Fråga 2",
        question: 'Vad betyder ordet "Halloween"?',
        posibleAnswers: ["Dödens natt", "Helgons kväll", "Återträffsdag", "Godisdagen"],
        rightAnswer: ["Helgons kväll"],
        type: "multiple choice",
        answer: [],
    },
    {
        heading: "Fråga 3",
        question: "Vilken är den mest populära Halloween kostymen för barn 2021?",
        posibleAnswers: ["Elsa", "Spiderman", "Spöke", "Pumpa"],
        rightAnswer: ["Spiderman"],
        type: "multiple choice",
        answer: [],
    },
    {
        heading: "Fråga 4",
        question: "Vilket av dessa är traditionella Halloween dekorationer?",
        posibleAnswers: ["Kittel", "Krans", "Spindel", "Pumpa"],
        rightAnswer: ["Spindel", "Kittel", "Pumpa"],
        type: "checkbox",
        answer: [],
    },
    {
        heading: "Fråga 5",
        question: "Vilka är medlemmar i Addams-family?",
        posibleAnswers: ["Gomez", "Lurch", "Morticia", "Wednesday"],
        rightAnswer: ["Gomez", "Morticia", "Wednesday"],
        type: "checkbox",
        answer: [],
    },
    {
        heading: "Fråga 6",
        question: 'Hette godiset"Godismajs" "Hönsfoder" innan?',
        posibleAnswers: [],
        rightAnswer: ["Sant"],
        type: "true/false",
        answer: [],
    },
    {
        heading: "Fråga 7",
        question: "Vilken är den populäraste Halloween-dräkten för husdjur?",
        posibleAnswers: ["Spindelmannen", "Pumpa", "Häxa", "Jinker bell"],
        rightAnswer: ["Pumpa"],
        type: "multiple choice",
        answer: [],
    },
    {
        heading: "Fråga 8",
        question: 'Anordnas USAs största halloweenparaden i Texas?',
        posibleAnswers: [],
        rightAnswer: ["Falskt"],
        type: "true/false",
        answer: [],
    },
    {
        heading: "Fråga 9",
        question: 'Vem skrev "The Legend of Sleepy Hollow"?',
        posibleAnswers: ["Washington Irving", "Stephen King", "Agatha Christie", "Henry James"],
        rightAnswer: ["Washington Irving"],
        type: "multiple choice",
        answer: [],
    },
    {
        heading: "Fråga 10",
        question: "Var ligger Transsylvanien, annars känd som greve Draculas hem?",
        posibleAnswers: ["Noth Carolina", "Rumänien", "Irland", "Alaska"],
        rightAnswer: ["Rumänien"],
        type: "multiple choice",
        answer: [],
    },
];


// Start of code ---------------------------------------------------------------

// Variables
let contentWrapper = document.querySelector("#contentWrapper");
let questionDiv = document.querySelector("#questionDiv");

let currentQuestion = 0;
let darkmode = true;
let questions = JSON.parse(JSON.stringify(data));




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

// Changes class on body and icon inside button
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

// Reset the game without loosing dark/light-mode
function resetBtn(){
    currentQuestion = 0;
    questions = JSON.parse(JSON.stringify(data));
    welcomeMsg();
}


// Start of actual program code ☼/☽

// Welcome message when landing on this website
welcomeMsg();
function welcomeMsg(){
    contentWrapper.innerHTML = "";
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
        let list = document.createElement("dl");
        list.classList.add("list");
        div.append(list);
        
        questions.forEach(question => {
            let term = document.createElement("dt");
            let youAnswerd = document.createElement("dd");
            let rightAnswers = document.createElement("dd");
            if (question.answer.length !== 0){
                if (arrayEquals(question.answer, question.rightAnswer)){
                    term.innerText = `${question.heading}:  Rätt!`;
                    term.style.color = "green";
                    points.got++;
                }else{
                    term.innerText = `${question.heading}:  Fel.`;
                    term.style.color = "red";
                    youAnswerd.innerText += "Du svarade: ";
                    question.answer.forEach((answer) => { youAnswerd.innerText += answer + ", " })
                    youAnswerd.innerText = youAnswerd.innerText.substring(0, youAnswerd.innerText.length - 2);
                    youAnswerd.innerHTML += `.
                    `;
                }
            }else{
                term.innerText = `${question.heading}: svarade du inte på.`;
            }
            rightAnswers.innerText += "Rätt svar var: ";
            question.rightAnswer.forEach(rightAnswer => rightAnswers.innerText += rightAnswer + ", ")
            rightAnswers.innerText = rightAnswers.innerText.substring(0, rightAnswers.innerText.length - 2);
            rightAnswers.innerText += `.
            
            `;

            list.append(term, youAnswerd, rightAnswers);
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
