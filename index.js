// const { fetchMyIP } = require('./iss');
// const { fetchCoordsByIP } = require('./iss');
// const {fetchISSFlyOverTimes} = require('./iss')
const { nextISSTimesForMyLocation } = require('./iss')


/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const myIP =  '99.225.230.171'
const mycoords = { lat: '43.5448049', long: '80.2481666' }

///// sample code to text fetch my ip
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });


// fetchCoordsByIP(myIP, (error, data) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked!!!! Returned Coor:' , data);
// });


// fetchISSFlyOverTimes(mycoords, (error, data) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked!!!! ISS flight times:' , data);
// })

nextISSTimesForMyLocation((error, passTimes) =>{ 
  if (error){
    return console.log("It did not work!", error)
  }
  printPassTimes(passTimes)
})


const printPassTimes = function(passTimes) {
  for( pass of passTimes){
  let date = new Date(0)
  date.setUTCSeconds(pass.risetime)
  let duration = pass.duration;
  console.log(`Neext Pass at ${date} for ${duration} seconds`)
  } 
}