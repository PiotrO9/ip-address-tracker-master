import GEOINFORMATION_API from "./apikey.js";

console.log(GEOINFORMATION_API);

const IpAddress = document.getElementById("IpAddress");
const Location = document.getElementById("Location");
const Timezone = document.getElementById("Timezone");
const Isp = document.getElementById("Isp");

const searchBtn = document.getElementById("arrowContainer");

startApp();

searchBtn.addEventListener("click", function(){
    const ipFromInput = document.getElementById("mainInput").value;
    if(ValidateIPaddress(ipFromInput)) {
        let url = `http://ip-api.com/json/${ipFromInput}`;
        fetch(url).then(function(response){
            response.json().then(function(data){
                let lat = data.lat;
                let long = data.lon;

                SetMapWithCustomLocation(lat ,long);
                getLocation(ipFromInput);
            });
        });
    }
});

function startApp() {
    SetMap();
    getIpAddress();
}

function getIpAddress(inputIpAddress = "") {
    if(ValidateIPaddress(inputIpAddress)) {
        getLocation(inputIpAddress);
    }
    else {
        let url = 'https://api.db-ip.com/v2/free/self';
        fetch(url).then(function(response){
            response.json().then(function(data){
                getLocation(data.ipAddress);
            });
        });
    }
}

function getLocation(ipAddress) {
    let url = `https://geo.ipify.org/api/v2/country?apiKey=${GEOINFORMATION_API}&ipAddress=${ipAddress}`
    fetch(url).then(function(response){
        response.json().then(function(data){
            let isp = data.isp;
            let country = data.location.country;
            let timezone = "UTC " + data.location.timezone;

            fillTilesWithInformationFromApis(ipAddress, country, timezone, isp);
        });
    });
}

function fillTilesWithInformationFromApis(ipAddress, location, timezone, isp) {
    IpAddress.innerHTML = ipAddress;
    Location.innerHTML = location;
    Timezone.innerHTML = timezone;
    Isp.innerHTML = isp;
}

function SetMap() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let lat = position.coords.latitude;
                let long = position.coords.longitude;

                console.log(lat);

                var map = L.map('map', {
                    center: [lat, long],
                    zoom: 15
                });

                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    }).addTo(map);
            }
        )
    }
}

function SetMapWithCustomLocation(lat, long) {
    const main = document.querySelector("main");
    const mapToRemove = document.querySelector("#map");
    main.removeChild(mapToRemove);
    let newMap = document.createElement("div");
    newMap.setAttribute("id", "map");
    main.appendChild(newMap);

    var map = L.map('map', {
        center: [lat, long],
        zoom: 15
    });

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
}

function ValidateIPaddress(ipaddress) {  
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
      return (true);
    }
    return (false);
  }  