const flagContainer = document.querySelector(".flag-container");
const nameContainer = document.querySelector(".name-container");
const buttonContainer = document.querySelector(".button-container");

const playBtn = document.querySelector(".playBtn");

const attCount = document.querySelector('.attCount')

var hits = document.querySelector(".hits");
var errors = document.querySelector(".errors");
var points = document.querySelector(".points");

var hitCount = 0;
var errorCount = 0
var value = 0;

var countries = '';
var numberFlag = '';

const hitSound = new Audio('./sounds/hit.mp3')
const errorSound = new Audio('./sounds/error.mp3')
const gameOverSound = new Audio('./sounds/gameOver.wav')

getCountries(countries);

async function getCountries() {
    const res = await fetch("https://restcountries.eu/rest/v2/all");
    countries = await res.json();

    playBtn.addEventListener("click", function() { getGameDisplay(countries), false })

}

function getGameDisplay(countries) {

    var sortNumber = [];
    flagContainer.innerHTML = "";
    nameContainer.innerHTML = "";

    //escolher os 4 países
    for (let i = 0; i < 4; i++) {
        //choose 4 countries
        var number = Math.floor(Math.random() * 250 + 1);

        if (sortNumber.indexOf(number) == -1) {
            sortNumber.push(number);
        }

        const countryBtn = document.createElement("div");
        countryBtn.classList.add("countryBtn");

        countryBtn.innerHTML = `
            <button class="country-name-button">${countries[number].name}</button>
            `;

        nameContainer.appendChild(countryBtn);
    }

    //escolher 1 bandeira entre os 4 países
    for (let i = 0; i < 1; i++) {
        //choose 1 flag of 4 countries
        var numberArray = Math.floor(Math.random() * 4 + 1 - 1);
        var numberFlag = sortNumber[numberArray];
    }

    let countryFlag = countries[numberFlag].flag;

    const countryEl = document.createElement("div");
    countryEl.classList.add("flag");

    //colocar a bandeira na tela
    countryEl.innerHTML = `
        <img src="${countryFlag}" />
        `;

    flagContainer.appendChild(countryEl);


    //função para validar os erros e os acertos
    validationGame(countries, numberFlag);

    playBtn.style.display = "none"

}

function validationGame(countries, numberFlag) {

    const countryButtons = document.querySelectorAll(".country-name-button");

    countryButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.innerText === countries[numberFlag].name) {
                hitSound.play()
                btn.style.color = "green";
                btn.disabled = true;
                hitAttempt();
            } else {
                errorCount++
                btn.style.color = "red";
                btn.disabled = true;
                error(errorCount)
            }
        });
    });
}

function hitAttempt() {
    hits.innerHTML = ++hitCount;
    hits.style.background = 'rgb(34, 129, 34)'
    value += 100
    points.innerHTML = value;
    setTimeout(function() { getGameDisplay(countries) }, 1500)

}

function error(errorCount) {
    if (errorCount === 1) {
        errorSound.play()
        document.querySelector('.first').style.background = '#ed213a'
    } else if (errorCount === 2) {
        errorSound.play()
        document.querySelector('.second').style.background = '#ed213a'
    } else if (errorCount === 3) {
        document.querySelector('.third').style.background = '#ed213a'
        gameOverSound.play()
        gameOver()
    }
}


function gameOver() {
    flagContainer.innerHTML = "";
    nameContainer.innerHTML = "";
    playBtn.style.display = "none";

    var endGame = document.createElement("p");
    endGame.classList.add("end-game");
    endGame.innerHTML = "Game Over";

    var newGameParag = document.createElement("p");

    var newGameBtn = document.createElement("button");
    newGameBtn.classList.add("new-game", "score");
    newGameBtn.innerHTML = "New Game";

    newGameParag.appendChild(newGameBtn);

    nameContainer.appendChild(endGame);
    buttonContainer.appendChild(newGameParag);

    newGameBtn.addEventListener("click", () => {
        newGame();
    });
}

function newGame() {
    location.reload();
}