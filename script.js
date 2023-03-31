
const container = document.querySelector(".container");

const countries = fetch("https://restcountries.com/v3.1/all");
countries.then((response) => {
    return response.json();
}).then((json) => {
    json.forEach(element => {
        const state = document.createElement("div");
        state.classList.add("country");
        state.innerHTML = `<div class="state-flag">
        <img src="${element.flags.png}" alt="state_flag">
    </div>
    <div class="state-info">
        <h4>${element.name.common}</h4>
        <p><span>Population</span> ${element.population}</p>
        <p><span>Region</span> ${element.region}</p>
        <p><span>Capital</span> ${element.capital}</p>
    </div>`
        container.appendChild(state);
        const stateName = element.name.common;
        state.addEventListener("click", () => {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${stateName}&appid=16387e8ff859fea479e6fde976c6be4e&units=metric`)
                .then((res => {
                    return res.json()
                })).then((data) => {
                    console.log(data);
                    const description = data.weather[0].description;
                    const temp = data.main.temp + "C";
                    mainModal.classList.toggle("show-modal");
                    mainModal.innerHTML = `<div class="modal">
            <button class="close"><i class="fa-solid fa-xmark"></i></button>
            <div class="top-modal">
                <img src="${element.flags.png}" alt="flag">
            </div>
            <div class="bottom-modal">
                <h4>Weather in ${element.name.common}</h4>
                <p><span>Description:</span> ${description} </p>
                <p><span>Temp</span> ${temp}</p>
            </div>
        </div>`
        const closeModal=mainModal.querySelector(".close");
        closeModal.addEventListener("click",function (){
            mainModal.classList.toggle("show-modal");
        })
                });
            const mainModal = document.querySelector(".main-modal");
            
            mainModal.addEventListener("click", (e) => {
                if (e.target.classList == "main-modal") {
                    console.log(e.target);
                    mainModal.classList.toggle("show-modal");
                }
            });
        });
    });
});


