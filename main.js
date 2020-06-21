var openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/weather'; //link
var openWeatherMapUrlApiKey = 'f052d5acc2da057e09b938d2da9b806a'; //key

mapboxgl.accessToken = 'pk.eyJ1IjoidG9tYmlvbiIsImEiOiJja2JqZnFmYjkwb2RiMnJsc29keHZoZGc1In0.jNuGCxNFP1ntdoZDbo7DnQ'; // Set api token

var map = new mapboxgl.Map({ //initiate map
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: [-98.480770, 38.272689], // starting position [lng, lat]
  zoom: 4 // starting zoom
  
});

map.on('click', function(e) { //op muisklik word functie gestart
  //e.lngLat is the longitude, latitude geographical position of the event
  var lng = e.lngLat.lng //longitude gegevens
  var lat = e.lngLat.lat //latitude gegevens

  //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key}
  var request = openWeatherMapUrl + '?' + 'lat=' + lat + '&lon=' + lng + '&appid=' + openWeatherMapUrlApiKey; //link voor gegevens van selecteerde locatie op basis van latitude en longitude

  fetch(request).then((response) => response.json()).then(data => { //data ophalen van api en converteren naar json
    console.log(data) //als hulpmiddel

    var plaats = document.getElementById('plaats').innerHTML = data.name //naam plaats

    var coords = document.getElementById('coords').innerHTML = "long [" + data.coord.lon + "]" + " lat [" + data.coord.lat + "]" //coordinaten locatie

    var weer = document.getElementById('weer').innerHTML = data.weather[0].description //beschrijving van weer
    
    var temperatuur = document.getElementById('temp'); 
    var celcius = Math.floor(data.main.temp - 273.15); //temperatuur omrekenen naar graden celcius
    temperatuur.innerHTML = celcius + '&#176;C'; //graden celcius

    var windSnelheid = document.getElementById('wind').innerHTML = data.wind.speed + " m/s" //windsnelheid
    
    var advies = data.weather[0].main; //omschrijving van het weer
    var message;

    switch(advies) { //advies op basis van de omschrijving, alle mogelijke uitkomsten zitten in de switch
      case 'Clear':
        message = 'Granted';
        break;
      case 'Clouds':
        message = 'Granted';
        break;
      case 'Rain':
        message = 'Denied!';
        break;
      case 'Drizzle':
        message = 'Denied!';
        break;
      case 'Mist':
        message = 'Denied!';
        break;
      case 'Fog':
        message = 'Denied!';
        break;
      case 'Thunderstorm':
        message = 'Denied!';
        break;
      case 'Snow':
        message = 'Denied!';
        break;
      case 'Smoke':
        message = 'Denied!';
        break;
      case 'Haze':
        message = 'Denied!';
        break;
      case 'Dust':
        message = 'Denied!';
        break;
      case 'Ash':
        message = 'Denied!';
        break;
      case 'Squall':
        message = 'Denied!';
        break;
      case 'Tornado':
        message = 'Denied!';
        break;
    }

    document.getElementById('permission').innerHTML = message //advies op basis van switch
  })
});