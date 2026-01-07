// Comprobar que las cookies hayan sido anteriormente aceptadas

if (localStorage.getItem("cookiesAccepted") !== "true") {
    window.location.href = "cookies.html"
}

const countryMap = {
    ESP: "es",
    NED: "nl",
    GBR: "gb",
    ITA: "it",
    FRA: "fr",
    GER: "de",
    MON: "mc",
    AUS: "au",
    BRA: "br",
    ARG: "ar",
    CAN: "ca",
    USA: "us",
    JPN: "jp",
    CHN: "cn",
    THA: "th",
    MEX: "mx",
};



// Fetch pilotos

const container_piloto = document.getElementById("drivers-container")

fetch("https://api.openf1.org/v1/drivers?session_key=latest")
    .then((response) => response.json())
    .then((jsonContent) =>
        jsonContent.forEach(driver => {
            const card = document.createElement("article");
            card.classList.add("driver-card");
            card.style.backgroundColor = `#${driver.team_colour}22`;
            card.style.color = `#${driver.team_colour}`;

            const img = document.createElement("img");
            img.src = driver.headshot_url;
            img.alt = `Foto de ${driver.full_name}`;
            card.appendChild(img)

            const header = document.createElement("div");
            header.classList.add("driver-header");

            const name = document.createElement("h2");
            name.innerText = driver.full_name;

            const flag = document.createElement("img");
            flag.classList.add("driver-flag");

            const flagCode = countryMap[driver.country_code];
            if (flagCode) {
                flag.src = `https://flagcdn.com/w20/${flagCode}.png`;
                flag.alt = driver.country_code;
            } else {
                flag.style.display = "none";
            }

            const nameWrapper = document.createElement("span");
            nameWrapper.classList.add("driver-name");
            nameWrapper.style.backgroundColor = `#${driver.team_colour}22`;
            nameWrapper.innerText = driver.full_name;

            const number = document.createElement("span")
            number.classList.add("driver-name");
            number.style.backgroundColor = `#${driver.team_colour}22`;
            number.innerText = driver.driver_number;

            header.appendChild(nameWrapper)
            header.appendChild(number)
            header.appendChild(flag);
            card.appendChild(header);

            const team = document.createElement("p");
            team.classList.add("driver-team");
            team.innerText = driver.team_name
            card.appendChild(team)



            container_piloto.appendChild(card)
            card.addEventListener("click", () => {
                window.location.href = `detail.html?driver=${driver.driver_number}`;
            })
        }))

