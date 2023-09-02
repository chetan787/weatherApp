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
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the response JSON data
        })
        
        .then(data => {
            if (data.error) {
                // console.error("Error received:", data.error);
                updateWeatherOnPage(data);
            } else {
                // console.log("Received data for updating page:", data);
                updateWeatherOnPage(data);
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }
});


function updateWeatherOnPage(data) {
    if (data.error) {
    //    console.log("error",data.error);
        const errorMessage = data.error;
        const errorDiv = document.createElement("div");
        errorDiv.classList.add("error");
        errorDiv.textContent = errorMessage;
        errorDiv.style.color = "red";

        const main = document.getElementById("main");
        main.innerHTML = "";
        main.appendChild(errorDiv);
    } else {
        // Handle the successful weather data case
        const temp = Ktoc(data.data.main.temp);
        const name = data.data.name;
        const weather = document.createElement("div");
        weather.classList.add("weather");
        // weather.innerHTML = `
        // <h2>${name}</h2>
        //     <h2>
        //         <img src="https://openweathermap.org/img/wn/${data.data.weather[0].icon}.png" />
                
        //         ${temp}°C
        //     </h2>
        //     <small>${data.data.weather[0].main}</small>
        //     <br>
        //     <small>${data.data.weather[0].description}</small>
        //     <small>${data.data.wind.speed}</small>


        // `;
        weather.innerHTML = `
    <h2>${name}</h2>
    <h2>
        <img src="https://openweathermap.org/img/wn/${data.data.weather[0].icon}.png" />
        ${temp}°C
    </h2>
    <small>${data.data.weather[0].main}</small>
    <br>
    <small>${data.data.weather[0].description}</small>
    <br>
    <small>Wind Speed: ${data.data.wind.speed} m/s</small>
    <br>
    <small>Wind Gust: ${data.data.wind.gust} m/s</small>
    <br>
    <small>Wind Direction: ${data.data.wind.deg}°</small>
    <br>
    <small>Humidity: ${data.data.main.humidity}%</small>
    <br>
    <small>Pressure: ${data.data.main.pressure} hPa</small>
`;

        const main = document.getElementById("main");
        main.innerHTML = "";
        main.appendChild(weather);
    }
}





function Ktoc(K){
    return Math.floor(K - 273.15);
}


