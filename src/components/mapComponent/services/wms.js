import {authkey} from '../config';

const L = require('leaflet');

export const createWmsLayer = (layerName) =>
	L.tileLayer.wms('https://gesstorservices.com/geoserver/wms', {
		layers: layerName,
		format: 'image/png',
		transparent: true,
		authkey: authkey,
	});

export function buildFeatureInfoUrl(map, latlng, layer) {
	const point = map.latLngToContainerPoint(latlng, map.getZoom());
	const size = map.getSize();
	const params = {
		request: 'GetFeatureInfo',
		service: 'WMS',
		srs: 'EPSG:4326',
		styles: '',
		transparent: true,
		version: '1.1.1',
		format: 'image/png',
		bbox: map.getBounds().toBBoxString(),
		height: size.y,
		width: size.x,
		layers: layer.options.layers,
		query_layers: layer.options.layers,
		info_format: 'application/json',
		x: Math.round(point.x),
		y: Math.round(point.y),
		authkey: authkey,
	};
	return (
		layer._url +
		'?' +
		Object.keys(params)
			.map((k) => k + '=' + encodeURIComponent(params[k]))
			.join('&')
	);
}
