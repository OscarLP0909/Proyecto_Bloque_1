const detailContainer = document.getElementById("detail-container");

const params = new URLSearchParams(window.location.search);
const driverNumber = Number(params.get("driver"));

console.log(driverNumber);

fetch("https://api.openf1.org/v1/drivers?session_key=latest")
    .then(res => res.json())
    .then(drivers => {
        const driver = drivers.find(d => d.driver_number === driverNumber);
        if (!driver) return;

        renderDriver(driver);
    });


    function renderDriver(driver) {
    fetch("https://api.openf1.org/v1/session_result?session_key=latest")
        .then(res => res.json())
        .then(results => {
            const result = results.find(r => r.driver_number === driverNumber);
            if (!result) return;

            buildCard(driver, result);
        });
}

function buildCard(driver, result) {
    const card = document.createElement("article");
    card.classList.add("driver-card");
    card.style.backgroundColor = `#${driver.team_colour}22`;
    card.style.color = `#${driver.team_colour}`;

    // Imagen
    const img = document.createElement("img");
    img.src = driver.headshot_url;
    img.alt = driver.full_name;
    card.appendChild(img);

    // Header 
    const header = document.createElement("div");
    header.classList.add("driver-header");

    const name = document.createElement("span");
    name.classList.add("driver-name");
    name.innerText = driver.full_name;
    name.style.backgroundColor = `#${driver.team_colour}22`;

    header.appendChild(name);
    card.appendChild(header);

    // Equipo
    const team = document.createElement("p");
    team.classList.add("driver-team");
    team.innerText = driver.team_name;
    card.appendChild(team);

    // --- RESULTADOS ---
    const stats = document.createElement("div");
    stats.classList.add("driver-stats");

    stats.innerHTML = `
        <p><strong>Posición:</strong> ${result.position}</p>
        <p><strong>Puntos:</strong> ${result.points}</p>
        <p><strong>Vueltas:</strong> ${result.number_of_laps}</p>
        <p><strong>Estado:</strong> ${
            result.dnf ? "Abandonó" :
            result.dsq ? "Descalificado" :
            "Acabó la carrera"
        }</p>
        ${result.gap_to_leader ? `<p><strong>Gap líder:</strong> +${result.gap_to_leader}s</p>` : ""}
    `;

    card.appendChild(stats);

    detailContainer.appendChild(card);
}


