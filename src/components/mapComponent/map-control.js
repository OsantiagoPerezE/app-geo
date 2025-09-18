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
import {updateStatistics} from './services/statistics';

const L = require('leaflet');

export var map = L.map('map', {
	center: initialCoords,
	zoom: 15,
	layers: [carto_light],
});
L.control.zoom({position: 'topright'}).addTo(map);
new L.control.scale({imperial: false}).addTo(map);

const zonaHomogeneaLayer = createWmsLayer('repelon:av_zonahomogeneafisicarural');
const sectorRuralLayer = createWmsLayer('repelon:cc_sectorrural');
const terrenoLayer = createWmsLayer('repelon:lc_terreno');

const overlayMaps = {
	'Zona Homogénea': zonaHomogeneaLayer,
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

// Crear control de capas primero
const layersControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

// Crear contenedor para estadísticas
const statsControl = L.control({position: 'bottomright'});
statsControl.onAdd = function () {
	const container = L.DomUtil.create('div', 'stats-container collapsed');

	// Crear contenido
	container.innerHTML = `
        <h4>Estadísticas por Sector Rural</h4>
        <div id="stats-content"></div>
    `;

	// Prevenir que los clicks en el contenedor afecten al mapa
	L.DomEvent.disableClickPropagation(container);
	L.DomEvent.disableScrollPropagation(container);

	return container;
};
statsControl.addTo(map);

// Crear botón de toggle por separado
const toggleButton = L.DomUtil.create('button', 'toggle-stats');
toggleButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
toggleButton.setAttribute('type', 'button');
toggleButton.title = 'Mostrar/Ocultar Estadísticas';

// Manejar el toggle del panel
toggleButton.onclick = function (e) {
	e.preventDefault();
	e.stopPropagation();
	const container = document.querySelector('.stats-container');
	if (container) {
		container.classList.toggle('collapsed');
		toggleButton.innerHTML = container.classList.contains('collapsed')
			? '<i class="fas fa-chevron-left"></i>'
			: '<i class="fas fa-chevron-right"></i>';
	}
};

// Agregar el botón al body
document.body.appendChild(toggleButton);

// Actualizar estadísticas cuando se cambian las capas
map.on('overlayadd overlayremove', function () {
	updateStatistics(map, sectorRuralLayer, zonaHomogeneaLayer);
});

// Resto de la configuración del mapa
ensurePredioModal(map);
registerWmsClick(map, terrenoLayer, sectorRuralLayer);
minimap.addTo(map);

const marcador = dynamicMarker(initialCoords, 0);
marcador.addTo(map);
attachMarkerPopup(map, marcador);

// Inicializar estadísticas y activar solo zonaHomogeneaLayer por defecto
zonaHomogeneaLayer.addTo(map);
updateStatistics(map, sectorRuralLayer, zonaHomogeneaLayer);

wirePdfCapture('capture-map-btn');
