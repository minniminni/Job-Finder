// element hsl
const hsl = document.querySelector('#hsl a');

//save map start position, paikka & own position, omapaikka
let paikka = {latitude: 60.2933524, longitude: 25.0027584};
let omapaikka = null;

// sets current coordinates to omapaikka
function success(pos){
  omapaikka = pos.coords;
}
//start searching for location
navigator.geolocation.getCurrentPosition(success);

//Add map to element #map
const map = L.map('map');
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// custom map icons
const punainenIkoni = L.divIcon({className: 'punainen-ikoni'});
const vihreaIkoni = L.divIcon({className: 'vihrea-ikoni'});
const pinkkiIkoni = L.divIcon({className: 'pinkki-ikoni'});
const ruskeaIkoni = L.divIcon({className: 'ruskea-ikoni'});
const keltainenIkoni = L.divIcon({className: 'keltainen-ikoni'});
const sininenIkoni = L.divIcon({className: 'sininen-ikoni'});
const oranssiIkoni = L.divIcon({className: 'oranssi-ikoni'});
const violettiIkoni = L.divIcon({className: 'violetti-ikoni'});
const mustaIkoni = L.divIcon({className: 'musta-ikoni'});
const valkoinenIkoni = L.divIcon({className: 'valkoinen-ikoni'});

//Using leaflet.js-library to show position on map (https://leafletjs.com/)
function paivitaKartta(crd) {
  map.setView([crd.latitude, crd.longitude], 13);
}

//1. Add markers & icon color 2. On click: Show pop up: job description + link to website 3. Sets start and end position for the mapping tool.
function lisaaMarker(paikka, ikoni) {
  L.marker([paikka.y, paikka.x], {icon: ikoni}).
      addTo(map).
      bindPopup(paikka.tyotehtava + '</br>' + '<button class="linkButton"><a href="' + paikka.linkki + '"target="_blank">Linkki sivulle</a></br></button>').
      on("popupopen", function() {
        hsl.href = `https://www.google.com/maps/dir/?api=1&origin=${omapaikka.latitude},${omapaikka.longitude}&destination=${paikka.y},${paikka.x}&travelmode=driving`;
      });
}

//API-documentation: Create elements for different professions
const sosiaaliala = 'https://gis.vantaa.fi/rest/tyopaikat/v1/Sosiaaliala';
const kotihoito = 'https://gis.vantaa.fi/rest/tyopaikat/v1/Kotihoito ja erityisasuminen';
const varhaiskasvatus = 'https://gis.vantaa.fi/rest/tyopaikat/v1/Varhaiskasvatus';
const terveys = 'https://gis.vantaa.fi/rest/tyopaikat/v1/Terveyden- ja sairaanhoito';
const hallinto = 'https://gis.vantaa.fi/rest/tyopaikat/v1/Hallinto-, esimies- ja asiantuntijatyö';
const harjoittelu = 'https://gis.vantaa.fi/rest/tyopaikat/v1/Harjoittelu ja kesätyö';
const tekninen = 'https://gis.vantaa.fi/rest/tyopaikat/v1/Tekninen ala';
const opetus = 'https://gis.vantaa.fi/rest/tyopaikat/v1/Opetusala';
const liikunta = 'https://gis.vantaa.fi/rest/tyopaikat/v1/Liikunta-, kirjasto-, kulttuuri- ja nuorisoala';
const pelastus = 'https://gis.vantaa.fi/rest/tyopaikat/v1/Palo- ja pelastusala';

// Fetch profession addresses & set correct icons
function haeTyopaikat(osoite, ikoni) {
  fetch(osoite).then(function(vastaus) {
    return vastaus.json();
  }).then(function(tyopaikat) {
    console.log(tyopaikat.length);
    for (let i = 0; i < tyopaikat.length; i++) {
      lisaaMarker(tyopaikat[i], ikoni);
    }
  });
}

//Call functions
haeTyopaikat(sosiaaliala, oranssiIkoni);
haeTyopaikat(kotihoito, ruskeaIkoni);
haeTyopaikat(varhaiskasvatus, keltainenIkoni);
haeTyopaikat(terveys, pinkkiIkoni);
haeTyopaikat(hallinto, sininenIkoni);
haeTyopaikat(harjoittelu, vihreaIkoni);
haeTyopaikat(tekninen, violettiIkoni);
haeTyopaikat(opetus, mustaIkoni);
haeTyopaikat(liikunta, valkoinenIkoni);
haeTyopaikat(pelastus, punainenIkoni);

paivitaKartta(paikka);

/* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content
- This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}
