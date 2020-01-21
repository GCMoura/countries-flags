const root = document.querySelector(".root");
const playBtn = document.querySelector(".play");

getCountries();

async function getCountries() {
    const res = await fetch("https://restcountries.eu/rest/v2/all");
    const countries = await res.json();

    displayCountries(countries);
}

function displayCountries(countries) {
    playBtn.addEventListener("click", () => {
        root.innerHTML = "";

        // for (let i = 0; i < 4; i++) {
        //     var number = Math.floor(Math.random() * 250 + 1);

        //     if (sortNumber.indexOf(number) == -1) {
        //         sortNumber.push(number);
        //     }

        //     const countryBtn = document.createElement("div");
        //     countryBtn.classList.add("country-buttons");

        //     countryBtn.innerHTML = `
        //     <button class="country-name">${countries[number].name}</button>
        //     `;

        //     root.appendChild(countryBtn);
        // }
        createCountryButton(countries);

        // for (let i = 0; i < 1; i++) {
        //     var numberArray = Math.floor(Math.random() * 4 + 1 - 1);
        //     var numberFlag = sortNumber[numberArray];
        // }

        // let countryFlag = countries[numberFlag].flag;

        // const countryEl = document.createElement("div");
        // countryEl.innerHTML = "";

        // countryEl.innerHTML = `
        // <div class="flag">
        //     <img src="${countryFlag}" />
        // </div>
        // `;

        // root.appendChild(countryEl);

        const countryButtons = document.querySelectorAll(".country-name");

        countryButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                if (btn.innerText === countries[numberFlag].name) {
                    btn.style.backgroundColor = "green";
                } else {
                    btn.style.backgroundColor = "red";
                }
            });
        });
    });
}

function createCountryButton(countries) {
    var sortNumber = [];
    for (let i = 0; i < 4; i++) {
        var number = Math.floor(Math.random() * 250 + 1);

        if (sortNumber.indexOf(number) == -1) {
            sortNumber.push(number);
        }

        const countryBtn = document.createElement("div");
        countryBtn.classList.add("country-buttons");

        countryBtn.innerHTML = `
        <button class="country-name">${countries[number].name}</button>
        `;

        root.appendChild(countryBtn);
    }

    for (let i = 0; i < 1; i++) {
        var numberArray = Math.floor(Math.random() * 4 + 1 - 1);
        var numberFlag = sortNumber[numberArray];
    }

    let countryFlag = countries[numberFlag].flag;

    const countryEl = document.createElement("div");
    countryEl.innerHTML = "";

    countryEl.innerHTML = `
    <div class="flag">
        <img src="${countryFlag}" />
    </div>
    `;

    root.appendChild(countryEl);
}