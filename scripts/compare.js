let driverData = [];

const selectOne = document.getElementById("driver-one")
const selectTwo = document.getElementById("driver-two")

function createDriverOption(driver) {
    const option = document.createElement("option")
    option.value = driver.driver_number;
    option.textContent = `${driver.full_name} (#${driver.driver_number})`;
    return option;
}

// Fetch

fetch("https://api.openf1.org/v1/drivers?session_key=9839")
    .then(res => res.json())
    .then(drivers => {
        console.log(drivers)
        drivers.forEach(driver => {
            driverData = drivers;
            const option1 = createDriverOption(driver);
            const option2 = createDriverOption(driver);

            selectOne.appendChild(option1)
            selectTwo.appendChild(option2)
        });
    })


selectOne.addEventListener("change", () => {
    filterSecondSelect();
});

selectTwo.addEventListener("change", () => {
    filterFirstSelect();
})

function filterSecondSelect() {
    const selectedValue = selectOne.value;

    Array.from(selectTwo.options).forEach(option => {
        option.disabled = option.value === selectedValue;
    });
}

function filterFirstSelect() {
    const selectedValue = selectTwo.value;

    Array.from(selectOne.options).forEach(option => {
        option.disabled = option.value === selectedValue;
    });
}

const form = document.getElementById("compare-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const driverOne = Number(selectOne.value);
    const driverTwo = Number(selectTwo.value);

    if (!driverOne || !driverTwo) {
        alert(`Debes seleccionar dos pilotos`);
        return;
    }

    if (driverOne === driverTwo) {
        alert(`Debes seleccionar dos pilotos distintos`);
        return;
    }

    console.log("Piloto 1:  ", driverOne)
    console.log("Piloto 2: ", driverTwo)

    fetch("https://api.openf1.org/v1/session_result?session_key=9839")
        .then(res => res.json())
        .then(results => {
            const resultadoPiloto1 = results.find(r => r.driver_number === Number(driverOne));
            const resultadoPiloto2 = results.find(r => r.driver_number === Number(driverTwo));

            const driverObj1 = driverData.find(d => d.driver_number === driverOne);
            const driverObj2 = driverData.find(d => d.driver_number === driverTwo);

            if (!resultadoPiloto1 || !resultadoPiloto2 || !driverObj1 || !driverObj2) {
                alert(`No hay rdatos suficientes.`);
                return;
            }

            const container = document.getElementById("comparison-result");
            container.innerHTML = "";

            const card1 = buildResultCard(resultadoPiloto1, driverObj1);
            const card2 = buildResultCard(resultadoPiloto2, driverObj2);

            container.appendChild(card1)
            container.appendChild(card2)


        })

    function buildResultCard(result, driver) {
        const card = document.createElement("article");
        card.classList.add("comparator-card");
        card.style.borderTop = `4px solid #${driver.team_colour}`;
        card.style.boxShadow = `0 18px 40px rgba(0,0,0,0.12)`;


        // IMAGEN / AVATAR
        let avatarElement;

        if (driver.headshot_url) {
            const img = document.createElement("img");
            img.src = driver.headshot_url;
            img.alt = driver.full_name;

            img.onerror = () => {
                createInitialAvatar();
                card.replaceChild(avatarElement, img);
            };

            avatarElement = img;
        } else {
            createInitialAvatar();
        }

        function createInitialAvatar() {
            const initials = driver.full_name
                .split(" ")
                .map(word => word[0])
                .join("");

            const avatar = document.createElement("div");
            avatar.classList.add("driver-avatar");
            avatar.innerText = initials;

            avatar.style.backgroundColor = `#${driver.team_colour}`;
            avatar.style.color = "#ffffff";

            avatarElement = avatar;
        }

        card.appendChild(avatarElement);


        const header = document.createElement("div");
        header.classList.add("driver-header");

        const name = document.createElement("h2");
        name.classList.add("driver-name");
        name.innerText = driver.full_name;
        name.style.backgroundColor = `#${driver.team_colour}22`;

        header.appendChild(name);
        card.appendChild(header);

        const resultList = document.createElement("ul");
        card.appendChild(resultList);

        const positionLi = document.createElement("li");
        positionLi.innerText = `Posición: ${result.position}`
        resultList.appendChild(positionLi);

        const pointsLi = document.createElement("li")
        pointsLi.innerText = `Puntos: ${result.points}`
        resultList.appendChild(pointsLi);

        const lapsLi = document.createElement("li")
        lapsLi.innerText = `Vueltas: ${result.number_of_laps}`
        resultList.appendChild(lapsLi);

        const status = document.createElement("li");
        status.innerHTML = `
        <p><strong>Estado:</strong> ${result.dsq ? "Descalificado" :
                result.dnf ? "Abandonó" :
                    "Acabó la carrera"
            }</p>
    `;

        resultList.appendChild(status);

        return card;
    }
})



