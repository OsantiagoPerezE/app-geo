import {buildFeatureInfoUrl} from './wms';

// Datos simulados para las estadísticas de los sectores rurales de Repelón
const mockData = {
	'Sector Villa Rosa': {
		'Área Total': '2,500 hectáreas',
		'Uso Principal': 'Agrícola',
		Distribución: {
			'Uso Agrícola': 65,
			'Uso Residencial': 20,
			'Uso Ganadero': 15,
		},
	},
	'Sector Rotinet': {
		'Área Total': '1,800 hectáreas',
		'Uso Principal': 'Mixto',
		Distribución: {
			'Uso Agrícola': 40,
			'Uso Residencial': 35,
			'Uso Ganadero': 25,
		},
	},
	'Sector Las Tablas': {
		'Área Total': '2,200 hectáreas',
		'Uso Principal': 'Ganadero',
		Distribución: {
			'Uso Agrícola': 30,
			'Uso Residencial': 25,
			'Uso Ganadero': 45,
		},
	},
	'Sector Cienaguita': {
		'Área Total': '1,600 hectáreas',
		'Uso Principal': 'Agrícola',
		Distribución: {
			'Uso Agrícola': 55,
			'Uso Residencial': 30,
			'Uso Ganadero': 15,
		},
	},
};

export function updateStatistics(map, sectorRuralLayer, zonaHomogeneaLayer) {
	const statsContent = document.getElementById('stats-content');
	if (!statsContent) {
		console.error('No se encontró el elemento stats-content');
		return;
	}

	let htmlContent = '';

	// Verificar si las capas están activas
	const sectorRuralActive = map.hasLayer(sectorRuralLayer);
	const zonaHomogeneaActive = map.hasLayer(zonaHomogeneaLayer);

	if (!sectorRuralActive && !zonaHomogeneaActive) {
		htmlContent =
			'<div class="no-data-message">Activa las capas de Sector Rural o Zona Homogénea para ver las estadísticas.</div>';
	} else {
		Object.entries(mockData).forEach(([sector, datos]) => {
			htmlContent += `
				<div class="sector-stats">
					<div><b>${sector}</b></div>
					<div class="stat-item">
						<span class="stat-label">Área Total:</span>
						<span class="stat-value">${datos['Área Total']}</span>
					</div>
					<div class="stat-item">
						<span class="stat-label">Uso Principal:</span>
						<span class="stat-value">${datos['Uso Principal']}</span>
					</div>
					<div class="stat-distribution">
						<div class="distribution-title">Distribución de Uso:</div>
						${Object.entries(datos.Distribución)
							.map(
								([uso, porcentaje]) => `
								<div class="stat-item">
									<span class="stat-label">${uso}:</span>
									<span class="stat-value">${porcentaje}%</span>
									<div class="progress-bar">
										<div class="progress" style="width: ${porcentaje}%"></div>
									</div>
								</div>
							`
							)
							.join('')}
					</div>
				</div>
			`;
		});
	}

	statsContent.innerHTML = htmlContent;
}
