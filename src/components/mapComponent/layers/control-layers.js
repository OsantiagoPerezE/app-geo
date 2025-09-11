import L from 'leaflet';

// BASEMAPS
export var standard_osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '©OpenStreetMap, ©Standard',
	minZoom: 0,
	maxZoom: 24,
	crossOrigin: true,
});
export var standard_osm_mm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '©OpenStreetMap, ©Standard',
	minZoom: 0,
	maxZoom: 24,
	crossOrigin: true,
});
export var carto_light = L.tileLayer(
	'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
	{attribution: '©OpenStreetMap, ©CartoDB', subdomains: 'abcd', maxZoom: 24, crossOrigin: true}
);

// BASEMAPS ADICIONALES

// OpenStreetMap Humanitarian
export var osm_humanitarian = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	attribution: '©OpenStreetMap, ©Humanitarian',
	subdomains: 'abc',
	maxZoom: 20,
	crossOrigin: true,
});

// OpenTopoMap
export var open_topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: '©OpenStreetMap, ©OpenTopoMap',
	subdomains: 'abc',
	maxZoom: 17,
	crossOrigin: true,
});

// Esri World Imagery (satélite)
export var esri_satellite = L.tileLayer(
	'https://server.arcgisonline.com/ArcGIS/rest/services/' +
		'World_Imagery/MapServer/tile/{z}/{y}/{x}',
	{
		attribution: 'Tiles © Esri',
		maxZoom: 19,
		crossOrigin: true,
	}
);

// Esri World Street Map
export var esri_street = L.tileLayer(
	'https://server.arcgisonline.com/ArcGIS/rest/services/' +
		'World_Street_Map/MapServer/tile/{z}/{y}/{x}',
	{
		attribution: 'Tiles © Esri',
		maxZoom: 19,
		crossOrigin: true,
	}
);

// Carto Dark
export var carto_dark = L.tileLayer(
	'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
	{
		attribution: '©OpenStreetMap, ©CartoDB',
		subdomains: 'abcd',
		maxZoom: 24,
		crossOrigin: true,
	}
);
