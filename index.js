// Questions
const questions = [
    {
        heading: "Fråga 1",
        quesion: "Vad är det här?",
        answer: "En banan"
    },
    {
        heading: "Fråga 2",
        quesion: "Vad är det här?",
        answer: "En kiwi"
    },
    {
        heading: "Fråga 3",
        quesion: "Vad är det här?",
        answer: "Ett äpple"
    }
];


// Start

let contentWrapper = document.querySelector("#contentWrapper");
let questionDiv = document.querySelector("#questionDiv");

let h3 = document.createElement("h3");
let p = document.createElement("p");
let btn = document.createElement("button");

// Tryck fram lite välkomsttext
let newH3 = h3;
newH3.innerText = "Välkommen till Ankademins quiz!";

let newP = p;
newP.innerText = `Tryck på startknappen för att börja spelet
och få 10st frågor att svara på.`

let newBtn = btn;
newBtn.innerText = "Starta quizzzet!"
newBtn.addEventListener("click", quiz);

contentWrapper.append(newH3, newP, newBtn);


// Funktionen som kör igenom alla frågorna
function quiz(){
    contentWrapper.innerHTML = "";

    
}
