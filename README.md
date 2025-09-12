# GEO APP

Aplicación web para visualización y control de mapas interactivos.

## Descripción

GEO APP es una aplicación desarrollada con JavaScript y Parcel que permite visualizar mapas, agregar marcadores y controlar capas de información geográfica. Está pensada para facilitar la gestión y visualización de datos espaciales de manera sencilla e intuitiva.

## Características principales

-    Visualización de mapas interactivos.
-    Control de capas (mostrar/ocultar diferentes fuentes de datos):
     -    Mapas base: Carto Light/Dark, OSM Standard/Humanitarian, OpenTopoMap, Esri Satélite/Callejero.
     -    Capas superpuestas: Terreno, Sector Rural y otras capas WMS.
-    Agregado y gestión de marcadores personalizados:
     -    Marcadores dinámicos con capacidad de rotación.
     -    Popups informativos con coordenadas geográficas.
     -    Interacción con elementos del mapa (terrenos, sectores rurales).
-    Consulta de información geográfica:
     -    Servicio WMS para obtener datos de predios y sectores.
     -    Visualización de información detallada en ventanas modales.
     -    Resaltado visual de elementos seleccionados en el mapa.
-    Mini-mapa y controles adicionales:
     -    Mini-mapa interactivo para navegación rápida.
     -    Control de escala para mediciones precisas.
     -    Funcionalidad de captura y exportación a PDF del mapa.
-    Interfaz moderna y responsiva.

## Instalación

1. Clona este repositorio:

     ```bash
     git clone <URL-del-repositorio>
     cd APP
     ```

2. Instala las dependencias:
     ```bash
     npm install
     ```

## Uso

Para iniciar la aplicación en modo desarrollo:

```bash
npm start
```

Esto levantará un servidor local en [http://localhost:1234](http://localhost:1234).

## Estructura del proyecto

-    `src/` — Código fuente de la aplicación.
     -    `components/` — Componentes reutilizables del mapa.
     -    `assets/` — Imágenes y recursos estáticos.
     -    `scss/` — Estilos en SASS.
-    `dist/` — Archivos generados tras la compilación.
-    `package.json` — Dependencias y scripts del proyecto.

## Dependencias principales

-    [Parcel](https://parceljs.org/) — Bundler para desarrollo web.
-    [Leaflet](https://leafletjs.com/) — Biblioteca JavaScript para mapas interactivos.
-    [Leaflet-MiniMap](https://github.com/Norkart/Leaflet-MiniMap) — Plugin para mostrar un mini-mapa.
-    [Leaflet-Marker-Rotation](https://github.com/bbecquet/Leaflet.RotatedMarker) — Plugin para rotación de marcadores.
-    [html2canvas](https://html2canvas.hertzen.com/) y [jsPDF](https://github.com/parallax/jsPDF) — Para captura y exportación de mapas a PDF.
