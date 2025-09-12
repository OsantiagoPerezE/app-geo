const L = require('leaflet');
import 'leaflet-marker-rotation/src/rotatedMarker';

const marcadorIcon = L.icon({
	iconUrl: `marker-icon.3f7d3721.png`,
	iconSize: [25, 40],
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
