
import fetch from 'node-fetch';

function getObjectFromUrl(url) {

    return new Promise(resolve=> 
        fetch(url)
            .then(response=>response.text())
            .then(text=>resolve(JSON.parse(text)))
            
    );

}

function getCountryBounds(country) {
    return new Promise(resolve=> 
        getObjectFromUrl(`https://nominatim.openstreetmap.org/search?q=${country}&format=json`)
    .then(object=>resolve({
        minLatitude:object[0].boundingbox[0],
        maxLatitude:object[0].boundingbox[1],
        minLongitude:object[0].boundingbox[2],
        maxLongitude:object[0].boundingbox[3],
    }))
    );
}

function main(){
    getCountryBounds('Romania').then(bounds=>console.log(bounds));
    getCountryBounds('Bulgaria').then(bounds=>console.log(bounds));
    getCountryBounds('Hungary').then(bounds=>console.log(bounds)); 

}

main();