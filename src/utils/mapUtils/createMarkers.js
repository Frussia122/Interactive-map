import mapboxgl from 'mapbox-gl';

const createMarkers = (mapRef, currentPlaces) => {
  if (currentPlaces) {
    if (mapRef.current.getLayer('markers')) {
      mapRef.current.removeLayer('markers');
      mapRef.current.removeSource('markers');
    }
  }
  console.log(currentPlaces);
  mapRef.current.addSource('markers', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: currentPlaces.map((place) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: place.geometry.coordinates,
        },
        properties: {
          title: place.properties.CompanyMetaData.name,
          description: place.properties.CompanyMetaData.address,
          hours: place.properties.CompanyMetaData.Hours.text,
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

  // Добавление обработчика события клика на маркер
  mapRef.current.on('click', 'markers', (e) => {
    const { title, description, hours } = e.features[0].properties;

    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(`<h3>${title}</h3><p>${description}</p> <p>${hours}</p>`)
      .addTo(mapRef.current);
  });
};

export default createMarkers;
