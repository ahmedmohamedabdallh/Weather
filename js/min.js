
let today = document.getElementById("today"),
todayDate = document.getElementById("today-date"),
cityLocation = document.getElementById("location"),
todayDegree = document.getElementById("today-degree"),
todayIcon = document.getElementById("today-icon"),
description = document.getElementById("today-description"),
humidty = document.getElementById("humidty"),
wind = document.getElementById("wind"),
compass = document.getElementById("compass"),
searchBar = document.getElementById("search-bar");
displaytemp=document.getElementById("search");
bg=document.getElementById("")

let nextDay = document.getElementsByClassName("nextDay"),
nextDayIcon = document.getElementsByClassName("nextDay-icon"),
maxDegree = document.getElementsByClassName("max-degree"),
minDegree = document.getElementsByClassName("min-degree"),
nextDayDescription = document.getElementsByClassName("nextDay-description"),

currentCity = 'cairo',
apiResponse,
responseData,
monthName = ['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec'],
days = [
 "Sunday",
 "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];



async function getWeatherData ( ){
apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=aeac46f3d7604e16bdd102156222112&q=${currentCity}&days=3`)
responseData = await apiResponse.json();
console.log(responseData)

 if(responseData.current.condition.text=="Clear"&&responseData.current.temp_c<=2){
    displaytemp.style.backgroundImage =
"url('../img/Winter_building_snow_trees_snow_drifts-2016_Nature_HD_Wallpaper_2560x1600.jpg')";
}
else if (responseData.current.condition.text=="Clear") {
displaytemp.style.backgroundImage =
"url('../img/clear.jpg')";
bg.style.background="#3e414193"

}
else if(responseData.current.condition.text=="Partly cloudy"&&responseData.current.temp_c<=2){
    displaytemp.style.backgroundImage =
"url('../img/99df8369bb55660b6d91ca2eb13f7332.jpg')";
}
else if(responseData.current.condition.text=="Partly cloudy"){
    displaytemp.style.backgroundImage =
"url('../img/cloud.jpg')";
}


else if(responseData.current.condition.text=="Snow"){
    displaytemp.style.backgroundImage =
    "url('../img/snow.jpg')";
    }
    else if(responseData.current.condition.text=="Sunny"&&responseData.current.temp_c<=3){
        displaytemp.style.backgroundImage =
        "url('../img/911513fc55253b2d813e54b77b2f6c06.jpeg')";
        }
else if(responseData.current.condition.text=="Sunny"||responseData.current.temp_c>=25){
displaytemp.style.backgroundImage =
"url('../img/sunny.jpg')";
}
else if(responseData.current.condition.text=="Overcast"&&responseData.current.temp_c<=2){
    displaytemp.style.backgroundImage =
    "url('../img/99df8369bb55660b6d91ca2eb13f7332.jpg')";
    }
else if(responseData.current.condition.text=="Overcast"){
displaytemp.style.backgroundImage =
"url('../img/cloud.jpg')";
}

else if(responseData.current.condition.text=="Light rain"||responseData.current.condition.text=="Moderate rain"){
displaytemp.style.backgroundImage =
"url('../img/rain.jpg')";
}
else if(responseData.current.condition.text=="Fog"){
displaytemp.style.backgroundImage =
"url('../img/739502-Forests-Fog.jpg')";
}

else if (responseData.current.condition.text=='Thunderstorm'||responseData.current.condition.text=='Thundery outbreaks possible') {
displaytemp.style.backgroundImage =
"url('../img/thunderstorm.jpg')";
}
else if (responseData.current.condition.text=='Mist') {
displaytemp.style.backgroundImage =
"url('../img/nature-landscape-mist-mountains-wallpaper.jpg')";
}

displayTodate() 
displayNextDayWeather();
getCoordintes();
}
getWeatherData(  );

let date =new Date()
function displayTodate() {

today.innerHTML=days[date.getDay()]
todayDate.innerHTML=`${date.getDay()}  ${monthName[date.getMonth()]}`
cityLocation.innerHTML= responseData.location.name;
todayDegree.innerHTML=responseData.current.temp_c;


todayIcon.setAttribute("src",`https:${responseData.current.condition.icon}`)
description.innerHTML=responseData.current.condition.text;
humidty.innerHTML=responseData.current.humidity;
wind.innerHTML=responseData.current.wind_kph;
compass.innerHTML=responseData.current.wind_dir;



}



function displayNextDayWeather(){
for (let i = 0; i < nextDay.length; i++) {
nextDay[i].innerHTML= days[ new Date(responseData.forecast.forecastday[i+1].date).getDay()];
nextDayIcon[i].setAttribute("src",`https:${responseData.forecast.forecastday[i+1].day.condition.icon}`)
maxDegree[i].innerHTML=responseData.forecast.forecastday[i+1].day.maxtemp_c;
minDegree[i].innerHTML=responseData.forecast.forecastday[i+1].day.mintemp_c
nextDayDescription[i].innerHTML=responseData.forecast.forecastday[i+1].day.condition.text
}

}


searchBar.addEventListener("keyup",()=>{

currentCity=searchBar.value

getWeatherData (currentCity )
})

function getCoordintes() {
var options = {
    enableHighAccuracy: true,
    timeout: 2000,
    maximumAge: 0
};

function success(pos) {
    var crd = pos.coords;
    var lat = crd.latitude.toString();
    var lng = crd.longitude.toString();
    var coordinates = [lat, lng];
    console.log(`Latitude: ${lat}, Longitude: ${lng}`);
    getCity(coordinates);
    return;

}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);
}


function getCity(coordinates) {
var xhr = new XMLHttpRequest();
var lat = coordinates[0];
var lng = coordinates[1];


xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.7760a25728d455db48a65a40c685518d &lat=" +
lat + "&lon=" + lng + "&format=json", true);
xhr.send();
xhr.onreadystatechange = processRequest;
xhr.addEventListener("readystatechange", processRequest, false);

function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
         response = JSON.parse(xhr.responseText);
         city = response.address.city;
        console.log(city);
 
  
        return;
    }
}
}




