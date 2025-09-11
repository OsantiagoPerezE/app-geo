const L = require('leaflet');

export function attachMarkerPopup(map, marker) {
	var popup = L.popup();
	function onMapClick(e) {
		console.log('===', e.latlng.lat, ',', e.latlng.lng);
		popup.setLatLng(e.latlng)
			.setContent(
				`<b>REPELON:</b><br>
            Latitud: <span style="color:#2980b9">${e.latlng.lat}</span><br>
            Longitud: <span style="color:#27ae60">${e.latlng.lng}</span>`
			)
			.openOn(map);
	}
	marker.on('click', onMapClick);
}
