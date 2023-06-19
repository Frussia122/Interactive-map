import mapboxgl from 'mapbox-gl';

const initializeMap = (mapContainerRef) => new mapboxgl.Map({
  container: mapContainerRef,
  style: 'mapbox://styles/mapbox/navigation-night-v1',
  center: [0, 0],
  zoom: 14,
});

export default initializeMap;
