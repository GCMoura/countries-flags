const flagContainer = document.querySelector(".flag-container");
const nameContainer = document.querySelector(".name-container");

const playBtn = document.querySelector(".playBtn");

getCountries();

async function getCountries() {
    const res = await fetch("https://restcountries.eu/rest/v2/all");
    const countries = await res.json();

    displayCountries(countries);
}

function displayCountries(countries) {
    playBtn.addEventListener("click", () => {
        var sortNumber = [];

        flagContainer.innerHTML = "";
        nameContainer.innerHTML = "";

        for (let i = 0; i < 4; i++) {
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

        flagContainer.appendChild(countryEl);

        const countryButtons = document.querySelectorAll(".country-name-button");

        countryButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                if (btn.innerText === countries[numberFlag].name) {
                    btn.style.color = "green";
                    btn.disabled = true;
                } else {
                    btn.style.color = "red";
                    btn.disabled = true;
                }
            });
        });
    });
}