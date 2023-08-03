document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();

    const city = document.getElementById("search").value;

    if (city) {
        fetch("/submit", {
            method: "POST", // Specify the HTTP method as POST
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ city: city }) // Convert data to JSON format
        })
        .then(response => response.json()) // Parse the response JSON data
        .then(data => {
            console.log("Received data for updating page:", data);
            updateWeatherOnPage(data);
        })
        
            .catch(error => {
                console.error("Error:", error);
            });
    }
});


function updateWeatherOnPage(data) {
    const temp = Ktoc(data.data.main.temp);
    console.log("data main",data.data.main);
    const name = data.data.name;
    const weather = document.createElement("div");
    weather.classList.add("weather");
    weather.innerHTML = `
    <h2>${name}</h2>
        <h2>
            <img src="https://openweathermap.org/img/wn/${data.data.weather[0].icon}.png" />
            ${temp}°C
        </h2>
        <small>${data.data.weather[0].main}</small>
    `;
    const main = document.getElementById("main");
    main.innerHTML = "";
    main.appendChild(weather);
}





function Ktoc(K){
    return Math.floor(K - 273.15);
}


