import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function wirePdfCapture(buttonId = 'capture-map-btn') {
	const btn = document.getElementById(buttonId);
	if (!btn) return;
	btn.addEventListener('click', async function () {
		if (btn._busy) return;
		btn._busy = true;
		btn.disabled = true;
		const originalText = btn.innerHTML;
		btn.innerHTML = 'Capturando…';
		try {
			const mapElement = document.body;
			const canvas = await html2canvas(mapElement, {useCORS: true, logging: false});
			const imgData = canvas.toDataURL('image/png');
			const pdf = new jsPDF({
				orientation: 'landscape',
				unit: 'px',
				format: [canvas.width, canvas.height],
			});
			pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
			pdf.save('captura_mapa.pdf');
		} catch (err) {
			console.error('Error al capturar el mapa', err);
		} finally {
			btn.disabled = false;
			btn.innerHTML = originalText;
			btn._busy = false;
		}
	});
}
