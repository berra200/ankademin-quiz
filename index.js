// Questions
const questions = [
    {
        heading: "Fråga 1",
        question: "Vad är det här?",
        answer: "En banan"
    },
    {
        heading: "Fråga 2",
        question: "Vad är det här?",
        answer: "En kiwi"
    },
    {
        heading: "Fråga 3",
        question: "Vad är det här?",
        answer: "Ett äpple"
    }
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
        newH3 = document.createElement("h3");
        newH3.innerText = "Slut";
        contentWrapper.append(newH3);
    }else{
        // Create heading
        newH3 = document.createElement("h3");
        newH3.innerText = questions[currentQuestion].heading;
    
        // Create question
        newP = document.createElement("p");
        newP.innerText = questions[currentQuestion].question;
    
        // Create possible answers
        
        
        // Create navigation buttons
        backBtn = document.createElement("button");
        backBtn.id = "backBtn";
        backBtn.innerText = "Tillbaka";
        backBtn.addEventListener("click", () => {
            currentQuestion--;
            quiz()
        })
        if (currentQuestion === 0){ // If first question dont show back button
            backBtn.style.visibility = "hidden";
        }
        
        nextBtn = document.createElement("button");
        nextBtn.id = "nextBtn";
        nextBtn.innerText = "Nästa";
        nextBtn.addEventListener("click", () => {
            currentQuestion++;
            quiz()
        })
        
        // Print out the question
        contentWrapper.append(newH3, newP, backBtn, nextBtn);
    }

}
// End of main quiz function

