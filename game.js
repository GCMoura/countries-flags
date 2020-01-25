const flagContainer = document.querySelector(".flag-container");
const nameContainer = document.querySelector(".name-container");
const buttonContainer = document.querySelector(".button-container");

const playBtn = document.querySelector(".playBtn");
playBtn.style.display = "none";

var hits = document.querySelector(".hits");
var errors = document.querySelector(".errors");
var points = document.querySelector(".points");

var hitCount = 0;

var pointCount = 0;

var easyBtn = document.querySelector(".easy");
var mediumBtn = document.querySelector(".medium");
var hardBtn = document.querySelector(".hard");

var rulesBtn = document.querySelector(".rules-button");

getCountries();

async function getCountries() {
    const res = await fetch("https://restcountries.eu/rest/v2/all");
    const countries = await res.json();

    getGameDisplay(countries);
}

function getGameDisplay(countries) {
    var levelChoice;
    easyBtn.addEventListener("click", () => {
        nameContainer.innerHTML = "";
        levelChoice = "easy";
        playBtn.style.display = "block";
        rulesBtn.disabled = true;
        rulesBtn.style.cursor = "default";
        easyBtn.disabled = true;
        easyBtn.style.background = "#dc281e";
    });

    mediumBtn.addEventListener("click", () => {
        nameContainer.innerHTML = "";
        levelChoice = "medium";
        playBtn.style.display = "block";
        rulesBtn.disabled = true;
        rulesBtn.style.cursor = "default";
        mediumBtn.disabled = true;
        mediumBtn.style.background = "#dc281e";
    });

    hardBtn.addEventListener("click", () => {
        nameContainer.innerHTML = "";
        levelChoice = "hard";
        playBtn.style.display = "block";
        rulesBtn.disabled = true;
        rulesBtn.style.cursor = "default";
        hardBtn.disabled = true;
        hardBtn.style.background = "#dc281e";
    });

    playBtn.addEventListener("click", () => {
        var sortNumber = [];
        var errorCount = 0;
        flagContainer.innerHTML = "";
        nameContainer.innerHTML = "";
        errors.innerHTML = "";

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

        for (let i = 0; i < 1; i++) {
            //choose 1 flag of 4 countries
            var numberArray = Math.floor(Math.random() * 4 + 1 - 1);
            var numberFlag = sortNumber[numberArray];
        }

        let countryFlag = countries[numberFlag].flag;

        const countryEl = document.createElement("div");
        countryEl.classList.add("flag");

        countryEl.innerHTML = `
        <img src="${countryFlag}" />
        `;

        flagContainer.appendChild(countryEl);

        if (levelChoice === "easy") {
            easyPlay(countries, numberFlag, errorCount);
        } else if (levelChoice === "medium") {
            mediumPlay(countries, numberFlag, errorCount);
        } else {
            hardPlay(countries, numberFlag, errorCount);
        }
    });
}

function easyPlay(countries, numberFlag, errorCount) {
    var easyPoint = 100;
    var maxEasyError = 2;
    validationGame(countries, numberFlag, easyPoint, maxEasyError, errorCount);
}

function mediumPlay(countries, numberFlag, errorCount) {
    var mediumPoint = 300;
    var maxMediumError = 1;
    validationGame(
        countries,
        numberFlag,
        mediumPoint,
        maxMediumError,
        errorCount
    );
}

function hardPlay(countries, numberFlag, errorCount) {
    var hardPoint = 500;
    var maxHardError = 0;
    validationGame(countries, numberFlag, hardPoint, maxHardError, errorCount);
}

function validationGame(
    countries,
    numberFlag,
    pointValue,
    maxError,
    errorCount
) {
    const countryButtons = document.querySelectorAll(".country-name-button");

    countryButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.innerText === countries[numberFlag].name) {
                btn.style.color = "green";
                btn.disabled = true;
                hitAttempt(pointValue);
            } else {
                errors.innerHTML = ++errorCount;
                btn.style.color = "red";
                btn.disabled = true;
                errorAttempt(maxError, errorCount);
            }
        });
    });
}

function hitAttempt(pointValue) {
    hits.innerHTML = ++hitCount;
    let value = 0;
    value += pointValue * hitCount;
    points.innerHTML = value;
}

function errorAttempt(maxError, errorCount) {
    if (errorCount > maxError) {
        gameOver();
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
    newGameBtn.classList.add("new-game", "button");
    newGameBtn.innerHTML = "New Game";

    newGameParag.appendChild(newGameBtn);

    nameContainer.appendChild(endGame);
    buttonContainer.appendChild(newGameParag);

    easyBtn.disabled = true;
    mediumBtn.disabled = true;
    hardBtn.disabled = true;

    newGameBtn.addEventListener("click", () => {
        newGame();
    });
}

function newGame() {
    location.reload();
}

rulesBtn.addEventListener("click", () => {
    nameContainer.innerHTML = "";

    var rulesPar = document.createElement("p");
    rulesPar.classList.add("button");

    rulesPar.innerHTML =
        "First choose the level, them click Play button. <br> <br> Easy level - you can miss twice in 3 attempts. <br> Each hit is worth 100 pts. <br><br> Medium level - you can miss once in 2 attempts. <br> Each hit is worth 300 pts. <br> <br> Hard level - you can't go wrong. <br> Each hit is worth 500 pts";

    nameContainer.appendChild(rulesPar);
});