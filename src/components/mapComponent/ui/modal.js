const L = require('leaflet');

export function ensurePredioModal(map) {
	if (!document.getElementById('predio-modal')) {
		const modalDiv = document.createElement('div');
		modalDiv.id = 'predio-modal';
		modalDiv.className = 'predio-modal';
		modalDiv.style.display = 'none';
		modalDiv.innerHTML = `
            <div id="modal-content" class="modal-content">
                <button id="close-modal">&times;</button>
                <b>Información del Predio:</b>
                <div id="modal-body"></div>
            </div>
        `;
		document.body.appendChild(modalDiv);
		document.getElementById('close-modal').onclick = function () {
			modalDiv.style.display = 'none';
			if (window._predioHighlight) {
				map.removeLayer(window._predioHighlight);
				window._predioHighlight = null;
			}
		};
	}
}

export function showPredioInfo(map, feature) {
	if (window._predioHighlight) {
		map.removeLayer(window._predioHighlight);
	}
	window._predioHighlight = L.geoJSON(feature.geometry, {
		style: {color: '#e67e22', weight: 2, fillOpacity: 0.3},
	}).addTo(map);

	const props = feature.properties || {};
	const body = document.getElementById('modal-body');
	if (body) {
		body.innerHTML =
			`<span> <b>Etiqueta:</b>${props.etiqueta || '-'} <span><br>` +
			`<span> <b>Área Terreno:</b>${props.area_terreno || '-'} m²`;
	}
	const modal = document.getElementById('predio-modal');
	if (modal) modal.style.display = 'block';
}

export function hidePredioInfo(map) {
	const modal = document.getElementById('predio-modal');
	if (modal) modal.style.display = 'none';
	if (window._predioHighlight) {
		map.removeLayer(window._predioHighlight);
		window._predioHighlight = null;
	}
}
