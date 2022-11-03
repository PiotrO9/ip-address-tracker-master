let ipAddress = getIpAddress();
console.log(ipAddress);

function getIpAddress() {
    let url = 'https://api.db-ip.com/v2/free/self';
    fetch(url).then(function(response){
        response.json().then(function(data){
            // console.log(data);
            getLocation(data.ipAddress);
            console.log(data.ipAddress);
            return data.ipAddress;
        });
    });
}


function getLocation(ipAddress) {
    let url = `https://geo.ipify.org/api/v2/country?apiKey=at_rLn6qVLEB15NTJioufW2ItmoNkbyQ&ipAddress=${ipAddress}}`
    fetch(url).then(function(response){
        response.json().then(function(data){
            console.log(data);
        });
    });
}