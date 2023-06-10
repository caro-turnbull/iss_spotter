const { nextISSTimesForMyLocation } = require('./iss_promises');

nextISSTimesForMyLocation()
  .then(passTimes => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });

const printPassTimes = function(passTimes) {
  for (let pass of passTimes) {
    let date = new Date(0);
    date.setUTCSeconds(pass.risetime);
    let duration = pass.duration;
    console.log(`Neext Pass at ${date} for ${duration} seconds`);
  }
};