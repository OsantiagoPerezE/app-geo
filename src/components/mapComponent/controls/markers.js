const L = require('leaflet');
import 'leaflet-marker-rotation/src/rotatedMarker';

const marcadorIcon = L.icon({
	iconUrl: `marcador-48.a0bea0ef.png`,
	iconSize: [40, 40],
	popupAnchor: [0, -48],
});

// dynamic marker
export var dynamicMarker = (coords, angle) => {
	return L.rotatedMarker(coords, {
		icon: marcadorIcon,
		rotationOrigin: 'center',
		rotationAngle: angle,
	});
};
