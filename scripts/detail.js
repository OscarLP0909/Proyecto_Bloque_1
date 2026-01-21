const detailContainer = document.getElementById("detail-container");

const params = new URLSearchParams(window.location.search);
const driverNumber = Number(params.get("driver"));

console.log(driverNumber);

fetch("https://api.openf1.org/v1/drivers?session_key=9839")
    .then(res => res.json())
    .then(drivers => {
        const driver = drivers.find(d => d.driver_number === driverNumber);
        if (!driver) return;

        renderDriver(driver);
    });


    function renderDriver(driver) {
    fetch("https://api.openf1.org/v1/session_result?session_key=9839")
        .then(res => res.json())
        .then(results => {
            const result = results.find(r => r.driver_number === driverNumber);
            if (!result) return;

            buildCard(driver, result);
        });
}

function buildCard(driver, result) {
    // LIMPIAR CONTENEDOR (por si acaso)
    detailContainer.innerHTML = "";

    // CONTENEDOR PRINCIPAL
    const inner = document.createElement("div");
    inner.classList.add("driver-detail__inner");

    // ----- IMAGEN -----
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("driver-detail__image");

    const img = document.createElement("img");
    img.src = driver.headshot_url;
    img.alt = driver.full_name;

    imageWrapper.appendChild(img);

    // ----- INFO -----
    const info = document.createElement("div");
    info.classList.add("driver-detail__info");

    // Nombre
    const name = document.createElement("h2");
    name.textContent = driver.full_name;
    name.style.color = `#${driver.team_colour}`;

    // Equipo
    const team = document.createElement("span");
    team.classList.add("driver-team");
    team.textContent = driver.team_name;

    // Estado
    const status = document.createElement("div");
    status.classList.add("driver-status");
    status.textContent =
        result.dnf ? "ABANDONÓ" :
        result.dsq ? "DESCALIFICADO" :
        "CARRERA TERMINADA";

    // Estadísticas
    const stats = document.createElement("div");
    stats.classList.add("driver-stats");

    const statData = [
        ["Posición", result.position],
        ["Puntos", result.points],
        ["Vueltas", result.number_of_laps],
    ];

    if (result.gap_to_leader) {
        statData.push(["Gap líder", `+${result.gap_to_leader}s`]);
    }

    statData.forEach(([label, value]) => {
        const row = document.createElement("div");
        row.classList.add("driver-stat");

        row.innerHTML = `
            <span>${label}</span>
            <span>${value}</span>
        `;

        stats.appendChild(row);
    });

    // ENSAMBLAR INFO
    info.appendChild(name);
    info.appendChild(team);
    info.appendChild(stats);
    info.appendChild(status);

    // ENSAMBLAR TODO
    inner.appendChild(imageWrapper);
    inner.appendChild(info);

    detailContainer.appendChild(inner);
}



