const request = require('request');


const fetchMyIP = function(callback) {
  const url = `https://api.ipify.org?format=json`;
  // use request to fetch IP address from JSON API
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    try {
      const ip = JSON.parse(body).ip;
      callback(null, ip);
    } catch (parseError) {
      callback(parseError, null);
    }
  });
};


const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    const coords = JSON.parse(body);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    if (!coords['success']) {
      const msg = `Success status was ${coords.success}. Server message says: ${coords.message} when fetching for IP ${coords.ip}`;
      callback(Error(msg), null);
      return;
    }
    try {
      const writtenObj = {latitude: coords['latitude'], longitude: coords['longitude'] };
      callback(null, writtenObj);
    } catch (parseError) {
      callback(parseError, null);
    }
  });
};


const fetchISSFlyOverTimes = function(coords, callback){
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords['latitude']}&lon=${coords['longitude']}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    const times = JSON.parse(body);

    if (times['message'] !== 'success') {
      const msg = `Some error ${times[response]}`;
      callback(Error(msg), null);
      return;
    } 
    try {
      callback(null, times['response'])
    } catch (parseError) {
      callback(parseError, null);
    }
  })
}

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if(error) {
      return callback(error, null)
    }
    fetchCoordsByIP(ip, (error, loc) => {
      if(error) {
        return callback(error, null)
      }
      fetchISSFlyOverTimes(loc, (error, nextTimes) => {
        if(error) {
          return callback(error, null)
        }
      callback(null, nextTimes)
      })
    })
  })
}


// let date = IIIArray[risetime()]
// console.log(`Next pass at ${new Date( * 1000)}`)



module.exports = { nextISSTimesForMyLocation };