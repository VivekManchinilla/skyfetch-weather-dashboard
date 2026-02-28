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
// TODO: Create WeatherApp Constructor Function
function WeatherApp(apiKey) {
  // Store the API key
  this.apiKey = apiKey;

  // Store the API URLs
  this.apiUrl = "https://api.openweathermap.org/data/2.5/weather";
  this.forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";

  // Get references to DOM elements and store them
  this.searchBtn = document.getElementById("search-btn");
  this.cityInput = document.getElementById("city-input");
  this.weatherDisplay = document.getElementById("weather-display");

  // Call init method to set up event listeners
  this.init();
}
// TODO: Create init method on prototype
WeatherApp.prototype.init = function () {
  // Click on Search button
  this.searchBtn.addEventListener("click", this.handleSearch.bind(this));

  // Press Enter inside input
  this.cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      this.handleSearch();
    }
  });

  // Welcome message
  this.showWelcome();
};
// Without bind - this will be undefined
this.searchBtn.addEventListener('click', this.handleSearch);

// With bind - this will refer to WeatherApp instance
this.searchBtn.addEventListener('click', this.handleSearch.bind(this));
// TODO: Create showWelcome method
WeatherApp.prototype.showWelcome = function () {
  // Create welcome HTML
  const welcomeHTML = `
    <div class="welcome-message">
      <div class="welcome-icon">🌤️</div>
      <h2>Welcome to WeatherApp</h2>
      <p>Enter a city name and click <strong>Search</strong> (or press <strong>Enter</strong>) to see the current weather.</p>
    </div>
  `;

  // Display in weather display area
  this.weatherDisplay.innerHTML = welcomeHTML;
};
const app = new WeatherApp(CONFIG.API_KEY);
// TODO: Create handleSearch method
WeatherApp.prototype.handleSearch = function () {
  // Get city from input
  const city = this.cityInput.value.trim();

  // Validate input
  if (!city) {
    this.showError("Please enter a city name.");
    return;
  }

  if (city.length < 2) {
    this.showError("City name must be at least 2 characters.");
    return;
  }

  // Call getWeather method
  this.getWeather(city);

  // Clear input (optional)
  this.cityInput.value = "";
};
// TODO: Create getWeather method (async)
WeatherApp.prototype.getWeather = async function (city) {
  // Show loading state
  this.showLoading();

  // Disable search button
  this.searchBtn.disabled = true;
  this.searchBtn.textContent = "Searching...";

  // Build API URL with this.apiUrl and this.apiKey
  // units=metric for °C (you can change to imperial if needed)
  const url = `${this.apiUrl}?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`;

  try {
    // Make API call with await
    const response = await axios.get(url);

    // Call displayWeather with data
    this.displayWeather(response.data);
  } catch (error) {
    // Handle errors
    console.error("Error:", error);

    // Show appropriate error message
    if (error.response && error.response.status === 404) {
      this.showError("City not found. Please check the spelling and try again.");
    } else {
      this.showError("Something went wrong. Please try again later.");
    }
  } finally {
    // Re-enable search button
    this.searchBtn.disabled = false;
    this.searchBtn.textContent = "Search";
  }
};
// TODO: Create displayWeather method
WeatherApp.prototype.displayWeather = function (data) {
  // Extract data from response
  const cityName = data.name;
  const temperature = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  // Create weather HTML
  const weatherHTML = `
    <div class="weather-info">
      <h2 class="city-name">${cityName}</h2>
      <img class="weather-icon" src="${iconUrl}" alt="${description}" />
      <p class="temperature">${temperature}°C</p>
      <p class="description">${description}</p>
    </div>
  `;

  // Display in weather display area
  this.weatherDisplay.innerHTML = weatherHTML;

  // Focus back on input for next search
  this.cityInput.focus();
};
// TODO: Create showLoading method
WeatherApp.prototype.showLoading = function () {
  const loadingHTML = `
    <div class="loading-container">
      <div class="spinner"></div>
      <p>Loading weather...</p>
    </div>
  `;

  // Display loading state
  this.weatherDisplay.innerHTML = loadingHTML;
};
// TODO: Create showError method
WeatherApp.prototype.showError = function (message) {
  const errorHTML = `
    <div class="error-message">
      <div class="error-icon">⚠️</div>
      <h3>Oops!</h3>
      <p>${message}</p>
    </div>
  `;

  // Display error
  this.weatherDisplay.innerHTML = errorHTML;

  // Optional: focus input so user can retry quickly
  this.cityInput.focus();
};
// TODO: Remove all old function calls and listeners

// TODO: Create single instance of WeatherApp
// const app = new WeatherApp('YOUR_API_KEY');
// TODO: Create getForecast method (async)
WeatherApp.prototype.getForecast = async function (city) {
  // Build forecast API URL
  const url = `${this.forecastUrl}?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`;

  try {
    // Fetch forecast data
    const response = await axios.get(url);

    // Return the data
    return response.data;
  } catch (error) {
    console.error("Error fetching forecast:", error);
    // Throw error to be caught by caller
    throw error;
  }
};
// TODO: Modify getWeather method
WeatherApp.prototype.getWeather = async function (city) {
  this.showLoading();
  this.searchBtn.disabled = true;
  this.searchBtn.textContent = "Searching...";

  // Build current weather URL
  const currentWeatherUrl = `${this.apiUrl}?q=${encodeURIComponent(
    city
  )}&appid=${this.apiKey}&units=metric`;

  try {
    // Use Promise.all to fetch both current and forecast
    const [currentWeather, forecastData] = await Promise.all([
      axios.get(currentWeatherUrl),
      this.getForecast(city),
    ]);

    // Display current weather
    this.displayWeather(currentWeather.data);

    // Display forecast
    this.displayForecast(forecastData);
  } catch (error) {
    console.error("Error:", error);

    if (error.response && error.response.status === 404) {
      this.showError("City not found. Please check spelling.");
    } else {
      this.showError("Something went wrong. Please try again.");
    }
  } finally {
    this.searchBtn.disabled = false;
    this.searchBtn.textContent = "Search";
  }
};
// TODO: Create processForecastData method
WeatherApp.prototype.processForecastData = function (data) {
  // Filter forecast list to get one entry per day (at 12:00:00)
  const dailyForecasts = data.list.filter(function (item) {
    // Each item has dt_txt like "2024-01-20 12:00:00"
    return item.dt_txt && item.dt_txt.includes("12:00:00");
  });

  // Take only first 5 days
  return dailyForecasts.slice(0, 5);
};
// TODO: Create displayForecast method
WeatherApp.prototype.displayForecast = function (data) {
  // Process the forecast data
  const dailyForecasts = this.processForecastData(data);

  // Map through forecasts and create HTML for each
  const forecastHTML = dailyForecasts
    .map(function (day) {
      // Extract data
      const date = new Date(day.dt * 1000);
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      const temp = Math.round(day.main.temp);
      const description = day.weather[0].description;
      const icon = day.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      return `
        <div class="forecast-card">
          <h4 class="forecast-day">${dayName}</h4>
          <img class="forecast-icon" src="${iconUrl}" alt="${description}" />
          <p class="forecast-temp">${temp}°C</p>
          <p class="forecast-desc">${description}</p>
        </div>
      `;
    })
    .join("");

  // Create forecast section HTML
  const forecastSection = `
    <div class="forecast-section">
      <h3 class="forecast-title">5-Day Forecast</h3>
      <div class="forecast-container">
        ${forecastHTML}
      </div>
    </div>
  `;

  // Append to weather display (don't replace current weather!)
  this.weatherDisplay.innerHTML += forecastSection;
};
function WeatherApp(apiKey) {
  this.apiKey = apiKey;
  this.apiUrl = "https://api.openweathermap.org/data/2.5/weather";
  this.forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";

  // Existing DOM references
  this.searchBtn = document.getElementById("search-btn");
  this.cityInput = document.getElementById("city-input");
  this.weatherDisplay = document.getElementById("weather-display");

  // ✅ New DOM references
  this.recentSearchesSection = document.getElementById("recent-searches-section");
  this.recentSearchesContainer = document.getElementById("recent-searches-container");

  // ✅ Initialize recent searches array
  this.recentSearches = [];

  // ✅ Set maximum number of recent searches to save
  this.maxRecentSearches = 5;

  this.init();
}
// TODO: Create loadRecentSearches method
WeatherApp.prototype.loadRecentSearches = function () {
  // Get recent searches from localStorage
  const saved = localStorage.getItem("recentSearches");

  // If data exists, parse it and store in this.recentSearches
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      this.recentSearches = Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      this.recentSearches = [];
    }
  } else {
    this.recentSearches = [];
  }

  // Display the recent searches
  this.displayRecentSearches();
};
// TODO: Create saveRecentSearch method
WeatherApp.prototype.saveRecentSearch = function (city) {
  if (!city) return;

  // Convert city to title case for consistency (simple: first letter uppercase)
  const trimmed = city.trim();
  if (!trimmed) return;

  const cityName =
    trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();

  // Check if city already exists in array (remove it so we can add to front)
  const index = this.recentSearches.indexOf(cityName);
  if (index > -1) {
    this.recentSearches.splice(index, 1);
  }

  // Add city to the beginning of array
  this.recentSearches.unshift(cityName);

  // Keep only the last maxRecentSearches searches
  if (this.recentSearches.length > this.maxRecentSearches) {
    this.recentSearches = this.recentSearches.slice(0, this.maxRecentSearches);
  }

  // Save to localStorage
  localStorage.setItem("recentSearches", JSON.stringify(this.recentSearches));

  // Update display
  this.displayRecentSearches();
};
// TODO: Create displayRecentSearches method
WeatherApp.prototype.displayRecentSearches = function () {
  // Guard: if DOM refs are missing, don't crash
  if (!this.recentSearchesSection || !this.recentSearchesContainer) return;

  // Clear existing buttons
  this.recentSearchesContainer.innerHTML = "";

  // If no recent searches, hide the section
  if (!this.recentSearches || this.recentSearches.length === 0) {
    this.recentSearchesSection.style.display = "none";
    return;
  }

  // Show the section
  this.recentSearchesSection.style.display = "block";

  // Create a button for each recent search
  this.recentSearches.forEach(
    function (city) {
      const btn = document.createElement("button");
      btn.className = "recent-search-btn";
      btn.type = "button";
      btn.textContent = city;

      // Click handler (bind this)
      btn.addEventListener(
        "click",
        function () {
          this.cityInput.value = city;
          this.getWeather(city);
        }.bind(this)
      );

      this.recentSearchesContainer.appendChild(btn);
    }.bind(this)
  );
};
WeatherApp.prototype.getWeather = async function(city) {
    this.showLoading();
    this.searchBtn.disabled = true;
    this.searchBtn.textContent = 'Searching...';
    
    const currentUrl = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    
    try {
        const [currentWeather, forecastData] = await Promise.all([
            axios.get(currentUrl),
            this.getForecast(city)
        ]);
        
        this.displayWeather(currentWeather.data);
        this.displayForecast(forecastData);
        
        // TODO: Save this successful search to recent searches
        // this.saveRecentSearch(city);
        
        // TODO: Save as last searched city
        // localStorage.setItem('lastCity', city);
        
    } catch (error) {
        console.error('Error:', error);
        if (error.response && error.response.status === 404) {
            this.showError('City not found. Please check spelling and try again.');
        } else {
            this.showError('Something went wrong. Please try again later.');
        }
    } finally {
        this.searchBtn.disabled = false;
        this.searchBtn.textContent = 'Search';
    }
};
WeatherApp.prototype.init = function () {
  // Existing event listeners
  this.searchBtn.addEventListener("click", this.handleSearch.bind(this));
  this.cityInput.addEventListener(
    "keypress",
    function (e) {
      if (e.key === "Enter") {
        this.handleSearch();
      }
    }.bind(this)
  );

  // ✅ Load recent searches from localStorage
  this.loadRecentSearches();

  // ✅ Load last searched city
  this.loadLastCity();
};
// TODO: Create loadLastCity method
WeatherApp.prototype.loadLastCity = function () {
  // Get last city from localStorage
  const lastCity = localStorage.getItem("lastCity");

  // If exists, fetch weather for that city
  if (lastCity) {
    this.getWeather(lastCity);
  } else {
    // Show welcome message if no last city
    this.showWelcome();
  }
};
WeatherApp.prototype.showWelcome = function () {
  const welcomeHTML = `
    <div class="welcome-message">
      <div class="welcome-icon" aria-hidden="true">🌤️</div>
      <h2 class="welcome-heading">Welcome to WeatherApp</h2>
      <p class="welcome-text">Search for a city to get started.</p>
      <p class="welcome-examples">Try: <strong>London</strong>, <strong>Paris</strong>, <strong>Tokyo</strong></p>
    </div>
  `;

  this.weatherDisplay.innerHTML = welcomeHTML;
};
<div id="recent-searches-section" class="recent-searches-section">
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <h4 class="recent-searches-heading">Recent Searches</h4>

    
    <button id="clear-history-btn" class="clear-history-btn" type="button">
      Clear
    </button>
  </div>

  <div id="recent-searches-container"></div>
</div>
// TODO: Create clearHistory method
WeatherApp.prototype.clearHistory = function () {
  // Confirm with user
  if (confirm("Clear all recent searches?")) {
    this.recentSearches = [];
    localStorage.removeItem("recentSearches");
    this.displayRecentSearches();
  }
};
// In init() method
// TODO: Add clear history button listener
// const clearBtn = document.getElementById('clear-history-btn');
// if (clearBtn) {
//     clearBtn.addEventListener('click', this.clearHistory.bind(this));
// }