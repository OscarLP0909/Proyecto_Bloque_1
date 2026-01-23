const resultsContainer = document.getElementById("results-container");
const circuitImage = document.getElementById("circuit-image");
const circuitName = document.getElementById("circuit-name");

const params = new URLSearchParams(window.location.search);
const driverNumber = Number(params.get("driver"));

if (!driverNumber) {
    console.error("No hay piloto seleccionado");
}

initDetail();

/* =========================
   INIT
========================= */
async function initDetail() {
    try {
        const [
            drivers,
            raceResults,
            qualiResults
        ] = await Promise.all([
            fetchJSON("https://api.openf1.org/v1/drivers?session_key=9839"),
            fetchJSON("https://api.openf1.org/v1/session_result?session_key=9839"),
            fetchJSON("https://api.openf1.org/v1/session_result?session_key=9835")
        ]);

        const driver = drivers.find(d => d.driver_number === driverNumber);
        if (!driver) throw new Error("Piloto no encontrado");

        const raceResult = raceResults.find(r => r.driver_number === driverNumber);
        if (!raceResult) throw new Error("Resultado carrera no encontrado");

        const qualiResult = qualiResults.find(r => r.driver_number === driverNumber);

        const meeting = await getMeetingCached(raceResult.meeting_key);

        renderDriverSummary(driver);
        renderCircuit(meeting);
        renderRaceCard(raceResult);
        renderQualiCard(qualiResult);

        document.getElementById("page-loader").classList.add("hidden");
        document.getElementById("page-content").classList.remove("hidden");

    } catch (error) {
        console.error("Error cargando detalle:", error);

        document.getElementById("page-loader")?.classList.add("hidden");
    }
}

/* =========================
   HELPER FETCH
========================= */
async function fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error fetch ${url}`);
    return res.json();
}

/* =========================
   CIRCUIT CACHE (ANTI 429)
========================= */
async function getMeetingCached(meetingKey) {
    const cacheKey = `meeting_${meetingKey}`;

    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
        return JSON.parse(cached);
    }

    const meetings = await fetchJSON(
        `https://api.openf1.org/v1/meetings?meeting_key=${meetingKey}`
    );

    const meeting = meetings[0];

    sessionStorage.setItem(cacheKey, JSON.stringify(meeting));
    return meeting;
}

/* =========================
   RENDER CIRCUITO
========================= */
function renderCircuit(meeting) {

    if (!meeting) {
        circuitName.textContent = "Circuito no disponible";
        circuitImage.style.display = "none";
        return;
    }

    circuitName.textContent = meeting.circuit_short_name || "Circuito desconocido";

    if (meeting.circuit_image) {
        circuitImage.decoding = "async";
        circuitImage.loading = "lazy";
        circuitImage.src = meeting.circuit_image;
        circuitImage.alt = meeting.circuit_name;
        circuitImage.style.display = "block";
    } else {
        circuitImage.style.display = "none";
    }
}


/* =========================
   RENDER CARRERA
========================= */
function renderRaceCard(result) {
    const card = document.createElement("article");
    card.classList.add("result-card");

    card.innerHTML = `
        <h3 class="result-card__title">Carrera</h3>
        <div class="result-stat"><span>Posición</span><span>${result.position}</span></div>
        <div class="result-stat"><span>Puntos</span><span>${result.points}</span></div>
        <div class="result-stat"><span>Vueltas</span><span>${result.number_of_laps}</span></div>
        <div class="result-stat"><span>Distancia del líder</span><span>${result.gap_to_leader}</span></div>
    `;

    resultsContainer.appendChild(card);
}

function renderDriverSummary(driver) {
    const container = document.getElementById("driver-summary");
    container.innerHTML = "";
    const card = document.createElement("article");
    card.classList.add("driver-summary");

    card.innerHTML = `
    <h3 class="result-card__title">${driver.full_name}</h3>
    <div class="result-stat"><span>Equipo </span><span>${driver.team_name}</span></div>
    `

    container.appendChild(card);
}

/* =========================
   RENDER QUALY (ROBUSTO)
========================= */
function renderQualiCard(result) {
    const card = document.createElement("article");
    card.classList.add("result-card");

    if (!result) {
        card.innerHTML = `
            <h3 class="result-card__title">Clasificación</h3>
            <div class="result-status">SIN DATOS DISPONIBLES</div>
        `;
        resultsContainer.appendChild(card);
        return;
    }

    const q1 = result.duration?.[0] ?? "No clasificado";
    const q2 = result.duration?.[1] ?? "No clasificado";
    const q3 = result.duration?.[2] ?? "No clasificado";

    card.innerHTML = `
        <h3 class="result-card__title">Clasificación</h3>
        <div class="result-stat"><span>Posición</span><span>${result.position}</span></div>
        <div class="result-stat"><span>Q1</span><span>${formatLapTime(q1)}</span></div>
        <div class="result-stat"><span>Q2</span><span>${formatLapTime(q2)}</span></div>
        <div class="result-stat"><span>Q3</span><span>${formatLapTime(q3)}</span></div>
    `;

    resultsContainer.appendChild(card);
}

function formatLapTime(seconds) {
    if (seconds == null || isNaN(seconds)) return "—";

    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toFixed(3);

    return `${mins}:${secs.padStart(6, "0")}`;
}


