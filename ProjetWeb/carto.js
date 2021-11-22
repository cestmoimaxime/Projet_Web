'use strict';

const $coords = document.getElementById("coords");
const $displayCoords = document.getElementById("displayCoords");
const $formRecherche = document.getElementById("formRecherche");

let map = L.map('mapid').setView([46.836, 4.587], 7);

/*
L.tileLayer('https://wxs.ign.fr/essentiels/geoportail/wmts?layer=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&style=normal&tilematrixset=PM&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/png&TileMatrix={z}&TileCol={x}&TileRow={y}', {
    attribution: 'Données cartographiques : © IGN',
    maxZoom: 19,
}).addTo(map);
*/

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);





navigator.geolocation.getCurrentPosition(function (position) {
    let markerCurrentPos = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);
    markerCurrentPos.bindPopup("Vous êtes ici.");
    map.setView([position.coords.latitude, position.coords.longitude], 7);
});

map.on('mousemove', leafletEvent => {
    $coords.innerHTML = `${leafletEvent.latlng.lat.toFixed(5)} ${leafletEvent.latlng.lng.toFixed(5)}`;
    $coords.style.top = `${leafletEvent.originalEvent.clientY}px`;
    $coords.style.left = `${leafletEvent.originalEvent.clientX}px`;
});


/*var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);*/


var image1 = L.icon({
  iconUrl:'poufsouffle_blaireau.jpg',
  iconSize:[32,37],
  iconAnchor:[16,37],
  popupAnchor:[-3,-76]
});
/*L.marker([37.7508,14.9944], {icon:image1}).addTo(map).bindPopup('Enigme du blaireau');*/

var blaireau = L.marker([37.7508,14.9944], {icon: image1, draggable:true });
blaireau.bindPopup('Enigme du blaireau'+blaireau.getLatLng());
var shelterMarkers = new L.FeatureGroup();
shelterMarkers.addLayer(blaireau);





var image2 = L.icon({
  iconUrl:'serpentard_serpent.jpg',
  iconSize:[32,37],
  iconAnchor:[16,37],
  popupAnchor:[-3,-76]
});
/*L.marker([43.8853,-110.5777], {icon:image2}).addTo(map).bindPopup('Enigme du serpent');*/

var serpent = L.marker([43.8853,-110.5777], {icon: image2}).bindPopup('Enigme du serpent');
shelterMarkers.addLayer(serpent);




var image3 = L.icon({
  iconUrl:'serdaigle_aigle.jpg',
  iconSize:[32,37],
  iconAnchor:[16,37],
  popupAnchor:[-3,-76]
});
/*L.marker([46.8906,-0.9289], {icon:image3}).addTo(map).bindPopup('Enigme de l aigle');*/

var aigle = L.marker([46.8906,-0.9289], {icon: image3}).bindPopup('Enigme de l aigle');
shelterMarkers.addLayer(aigle);





var image4 = L.icon({
  iconUrl:'gryffondor_lion.jpg',
  iconSize:[32,37],
  iconAnchor:[16,37],
  popupAnchor:[-3,-76]
});
/*L.marker([37.8070,22.7066], {icon:image4}).addTo(map).bindPopup('Enigme du lion');*/

var lion = L.marker([37.8070,22.7066], {icon: image4}).bindPopup('Enigme du lion');
shelterMarkers.addLayer(lion);


var image5 = L.icon({
  iconUrl:'hagrid.jpg',
  iconSize:[32,37],
  iconAnchor:[16,37],
  popupAnchor:[-3,-76]
});
/*L.marker([51.53319,-0.12418], {icon:image5}).addTo(map).bindPopup('Question de Hagrid');*/

var hagrid = L.marker([51.53319,-0.12418], {icon: image5}).bindPopup('Question de Hagrid');
shelterMarkers.addLayer(hagrid);
map.on('zoomend', function() {
    if (map.getZoom() <6){
            map.removeLayer(shelterMarkers);
    }
    else {
            map.addLayer(shelterMarkers);
        }
});






const markerGroup = L.featureGroup().addTo(map);

$displayCoords.addEventListener('change', () => {
    if ($displayCoords.checked) {
        $coords.style.display = 'unset';
    } else {
        $coords.style.display = 'none';
    }
})


marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
$formRecherche.addEventListener('submit', (event) => {
    event.preventDefault();
    let textValue = document.getElementById('txtRecherche').value;
    fetch("http://api-adresse.data.gouv.fr/search/?q=" + textValue)
    .then(response => response.json())
    .then(response => {
        markerGroup.clearLayers();
        response.features.forEach( feature => {
            let coords = feature.geometry.coordinates;
            let marker = L.marker([coords[1], coords[0]]).addTo(markerGroup);
            marker.bindPopup(feature.properties.label);
        });
        map.fitBounds(markerGroup.getBounds())
    });
});
