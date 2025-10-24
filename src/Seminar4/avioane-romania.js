import fetch from 'node-fetch';

async function getObjectFromUrl(url) {
const response = await fetch(url);
const text = await response.text();
return JSON.parse(text);        
}

async function getCountryBounds(country) {

    const object = await getObjectFromUrl(`https://nominatim.openstreetmap.org/search?country=${country}&format=json`)
    return {
        minLatitude: object[0].boundingbox[0],
        maxLatitude: object[0].boundingbox[1],
        minLongitude: object[0].boundingbox[2],
        maxLongitude: object[0].boundingbox[3]
    }

}

async function getAirplanesInCountry(country) {

    const bounds=await getCountryBounds(country);

    const url=`https://opensky-network.org/api/states/all?lamin=${bounds.minLatitude}&lomin=${bounds.minLongitude}&lamax=${bounds.maxLatitude}&lomax=${bounds.maxLongitude}`
    const object = await getObjectFromUrl(url);
    return object;
}

function showAirplanes(country, airplanes) {
  console.log(`\nAvioane deasupra ${country}:`);

  
  if (!airplanes.states || airplanes.states.length === 0) {
    console.log("  Nu s-au găsit avioane.");
    return;
  }

  for (let i = 0; i < airplanes.states.length; i++) {
    const state = airplanes.states[i];
    const callsign = state[1] ? state[1].trim() : "(fără nume)";
    const origin = state[2];
    const lat = state[6];
    const lon = state[5];
    const alt = state[7];

    console.log(
      `${i + 1}. ${callsign} din ${origin} — altitudine: ${alt}m, pozitie: (${lat}, ${lon})`
    );
  }
}


async function main(){
const romania= await getAirplanesInCountry('Romania');
showAirplanes('Romania',romania);
}

main();
