import 'leaflet/dist/leaflet.css';
import './map.scss';
import {
	carto_light,
	standard_osm,
	osm_humanitarian,
	open_topo,
	esri_satellite,
	esri_street,
	carto_dark,
} from './layers/control-layers';
import {minimap} from './controls/minimap';
import {dynamicMarker} from './controls/markers';
import {initialCoords} from './config';
import {createWmsLayer} from './services/wms';
import {ensurePredioModal} from './ui/modal';
import {registerWmsClick} from './events/map-click';
import {attachMarkerPopup} from './events/popup';
import {wirePdfCapture} from './utils/capture';

const L = require('leaflet');

export var map = L.map('map', {
	center: initialCoords,
	zoom: 15,
	layers: [carto_light],
});
L.control.zoom({position: 'topright'}).addTo(map);
new L.control.scale({imperial: false}).addTo(map);

const terrenoLayer = createWmsLayer('repelon:lc_terreno');
const sectorRuralLayer = createWmsLayer('repelon:cc_sectorrural');

const overlayMaps = {
	Terreno: terrenoLayer,
	'Sector Rural': sectorRuralLayer,
};
const baseMaps = {
	'Carto Light': carto_light,
	'OSM Standard': standard_osm,
	'OSM Humanitarian': osm_humanitarian,
	OpenTopoMap: open_topo,
	'Esri Satélite': esri_satellite,
	'Esri Callejero': esri_street,
	'Carto Dark': carto_dark,
};
L.control.layers(baseMaps, overlayMaps).addTo(map);
ensurePredioModal(map);

registerWmsClick(map, terrenoLayer, sectorRuralLayer);

minimap.addTo(map);

const marcador = dynamicMarker(initialCoords, 0);
marcador.addTo(map);
attachMarkerPopup(map, marcador);

wirePdfCapture('capture-map-btn');
