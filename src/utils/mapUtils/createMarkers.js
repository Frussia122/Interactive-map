

const createMarkers = (mapRef, currentPlaces) => {
  if (currentPlaces) {
    if (mapRef.current.getLayer('markers')) {
      mapRef.current.removeLayer('markers');
      mapRef.current.removeSource('markers');
    }
  }
  mapRef.current.addSource('markers', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: currentPlaces.map(place => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: place.geometry.coordinates,
        },
      })),
    },
  });

  mapRef.current.addLayer({
    id: 'markers',
    type: 'symbol',
    source: 'markers',
    layout: {
      'icon-image': 'marker-15', 
      'icon-allow-overlap': true,
      'icon-size': 3,
    },
  });
};

export default createMarkers;