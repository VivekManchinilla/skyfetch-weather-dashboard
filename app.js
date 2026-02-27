// ✅ OpenWeatherMap API Config
const API_KEY = "9bd6a9e8b66e076c1223b24de021febb";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

// ✅ Show welcome message on load (instead of getWeather('London'))
document.getElementById("weather-display").innerHTML = `
  <p class="loading">👋 Enter a city name and click Search to get the weather.</p>
`;

// ✅ Fetch weather data (async/await)
async function getWeather(city) {
  const url = `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

  try {
    const response = await axios.get(url);
    console.log("Weather Data:", response.data);
    displayWeather(response.data);
  } catch (error) {
    console.error("Error fetching weather:", error);

    // OpenWeatherMap gives 404 for unknown city
    if (error.response && error.response.status === 404) {
      showError("City not found. Please check the spelling and try again.");
    } else {
      showError("Could not fetch weather data. Please try again.");
    }
  }
}

// ✅ Display weather data
function displayWeather(data) {
  const cityName = data.name;
  const temperature = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  const weatherHTML = `
    <div class="weather-info">
      <h2 class="city-name">${cityName}</h2>
      <img src="${iconUrl}" alt="${description}" class="weather-icon" />
      <div class="temperature">${temperature}°C</div>
      <p class="description">${description}</p>
    </div>
  `;

  document.getElementById("weather-display").innerHTML = weatherHTML;
}

// ✅ Error UI
function showError(message) {
  const weatherDisplay = document.getElementById("weather-display");
  weatherDisplay.innerHTML = `
    <div class="error-message" role="alert" aria-live="polite">
      <div class="error-icon">❌</div>
      <div>
        <h3 class="error-title">Oops! Something went wrong</h3>
        <p class="error-text">${message}</p>
      </div>
    </div>
  `;
}

// ✅ Get references to HTML elements
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");

// ✅ Reusable search logic
function handleSearch() {
  const city = cityInput.value.trim();

  if (!city) {
    showError("Please enter a city name.");
    return;
  }

  // Optional: show loading state while fetching
  document.getElementById("weather-display").innerHTML =
    `<p class="loading">⏳ Fetching weather for "${city}"...</p>`;

  getWeather(city);
}

// ✅ Click event listener
searchBtn.addEventListener("click", handleSearch);

// ✅ Enter key support
cityInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") handleSearch();
});
document.getElementById("weather-display").innerHTML = `
  <div class="welcome-message">
    <h2>👋 Welcome to SkyFetch!</h2>
    <p>Enter a city name to get started!</p>
  </div>
`;
// TODO: Create showLoading function
function showLoading() {
  const weatherDisplay = document.getElementById("weather-display");

  weatherDisplay.innerHTML = `
    <div class="loading-message" aria-live="polite">
      <div class="spinner" aria-hidden="true"></div>
      <p class="loading-text">Loading weather data...</p>
    </div>
  `;
}
const loadingHTML = `
  <div class="loading-container" aria-live="polite">
    <div class="spinner" aria-hidden="true"></div>
    <p class="loading-text">Loading weather data...</p>
  </div>
`;
async function getWeather(city) {
  // ✅ Call showLoading() at the START
  showLoading();

  const url = `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

  try {
    const response = await axios.get(url);
    // Loading will be replaced by weather data
    displayWeather(response.data);
  } catch (error) {
    console.error("Error:", error);

    // ✅ City not found
    if (error.response && error.response.status === 404) {
      showError("City not found. Please check the spelling and try again.");
      return;
    }

    // ✅ Too many requests / rate limit
    if (error.response && error.response.status === 429) {
      showError("Too many requests right now. Please wait a bit and try again.");
      return;
    }

    // ✅ Any other server/API error
    if (error.response) {
      showError("Weather service error. Please try again later.");
      return;
    }

    // ✅ Network error (no internet / request didn't reach server)
    showError("Network error. Check your internet connection and try again.");
  }
}
// Check error type
if (error.response && error.response.status === 404) {
  showError("City not found. Please check the spelling and try again.");
} else if (error.response && error.response.status === 429) {
  showError("Too many requests. Please wait a moment and try again.");
} else if (error.response) {
  showError("Weather service error. Please try again later.");
} else {
  showError("Network error. Check your internet connection and try again.");
}
// In your event listener (or inside handleSearch)
const city = cityInput.value.trim(); // handles empty + only spaces

// 1 & 2: empty / only spaces
if (!city) {
  showError("Please enter a city name.");
  return;
}

// 3: minimum length
if (city.length < 2) {
  showError("City name too short. Please enter at least 2 characters.");
  return;
}

// ✅ Proceed with search
getWeather(city);
async function getWeather(city) {
  showLoading();

  const url = `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

  // ✅ Disable search button
  const originalBtnText = searchBtn.textContent;
  searchBtn.disabled = true;
  searchBtn.textContent = "Searching...";

  try {
    const response = await axios.get(url);
    displayWeather(response.data);
  } catch (error) {
    console.error("Error:", error);

    if (error.response && error.response.status === 404) {
      showError("City not found. Please check the spelling and try again.");
    } else if (error.response && error.response.status === 429) {
      showError("Too many requests. Please wait a bit and try again.");
    } else if (error.response) {
      showError("Weather service error. Please try again later.");
    } else {
      showError("Network error. Check your internet connection and try again.");
    }
  } finally {
    // ✅ Re-enable button
    searchBtn.disabled = false;
    searchBtn.textContent = originalBtnText; // restores "🔍 Search" if that's what you used
  }
}
function displayWeather(data) {
  // Extract the data we need
  const cityName = data.name;
  const temperature = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  // Create HTML to display
  const weatherHTML = `
    <div class="weather-info">
      <h2 class="city-name">${cityName}</h2>
      <img src="${iconUrl}" alt="${description}" class="weather-icon" />
      <div class="temperature">${temperature}°C</div>
      <p class="description">${description}</p>
    </div>
  `;

  // Put it on the page
  document.getElementById("weather-display").innerHTML = weatherHTML;

  // ✅ Focus back on input for quick next search
  cityInput.focus();
}