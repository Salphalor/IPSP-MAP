function bold(text){
	return "<b>"+text+"</b>";
}

function hyperlink(text, url){
	return '<a href="'+url+'" target="_blank" rel="noopener noreferrer"> '+text+' </a>'
}

function popup_layout_std(heading, text, href_text, href_url){
	return bold(heading) + '<br>' + text + '<br>[ref: ' + hyperlink(href_text, href_url) + ']'
}

function popup_layout_pic(heading, text, pic_text, pic_url){
	return bold(heading) + '<br>' + text + '<br>'+pic_text + '<br>' + '<img src=' + pic_url + ' />';
}


////////////////////////////////
var map = L.map('mapid', {zoomControl : true,
						fullscreenControl: true,
						fullscreenControlOptions: {position: 'topleft'}
				}).setView([ 21.3274,  12.3922], 3);

var OpenStreetMap = L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
					    maxZoom: 19,
					    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
					});
OpenStreetMap.addTo(map);

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	maxZoom: 17,
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});


var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 8,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

var Esri_WorldShadedRelief = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri',
	maxZoom: 13
});

var Esri_OceanBasemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
	maxZoom: 13
});


var baseLayers = {
	"OpenStreetMap": OpenStreetMap,
	"Esri: WorldImagery": Esri_WorldImagery,
	"OpenTopoMap": OpenTopoMap,
	"Esri: WorldShadedRelief":Esri_WorldShadedRelief,
	"Esri: OceanBasemap":Esri_OceanBasemap
}

var layerControl = L.control.layers(baseLayers);
L.control.scale().addTo(map);
/////////////////////////////////////////
// var Layer_countries = L.layerGroup();
// console.log('...')
// console.log(IPSP_Info);
var IPSP_keys = Object.keys(IPSP_Info);
// console.log(IPSP_keys);

function functionFilter(feature) {  return IPSP_keys.includes(feature.properties.name)};
function functionStyle(feature) {  return {	color: 'gray'  }};

var customLayer = L.geoJson(null, {filter: functionFilter, style: functionStyle});
var countries = omnivore.topojson('./data/countries-110m.json', null, customLayer).addTo(map);

countries.bindPopup(function (layer) {
	// console.log(layer);
	var temp_str = bold(layer.feature.properties.name);
	temp_str += '<br>';
	temp_str += 'Number of Students: ';
	temp_str += IPSP_Info[layer.feature.properties.name]['No_Students'];
	temp_str += '<br>';
	temp_str += 'Contact: ';
	temp_str += IPSP_Info[layer.feature.properties.name]['contact'];
	return temp_str;
});

// Layer_countries.addLayer(countries);

// layerControl.addOverlay(Layer_countries, "Countries");
layerControl.addTo(map);
