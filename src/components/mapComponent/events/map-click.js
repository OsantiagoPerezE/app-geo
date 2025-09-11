import {buildFeatureInfoUrl} from '../services/wms';
import {showPredioInfo, hidePredioInfo} from '../ui/modal';

export function registerWmsClick(map, terrenoLayer, sectorRuralLayer) {
	map.on('click', function (e) {
		let activeLayer = null;
		if (map.hasLayer(terrenoLayer)) {
			activeLayer = terrenoLayer;
		} else if (map.hasLayer(sectorRuralLayer)) {
			activeLayer = sectorRuralLayer;
		}
		if (!activeLayer) return;
		fetch(buildFeatureInfoUrl(map, e.latlng, activeLayer))
			.then((r) => r.json())
			.then((data) => {
				if (data.features && data.features.length > 0) {
					const feature = data.features[0];
					showPredioInfo(map, feature);
				} else {
					hidePredioInfo(map);
				}
			})
			.catch(() => hidePredioInfo(map));
	});
}
