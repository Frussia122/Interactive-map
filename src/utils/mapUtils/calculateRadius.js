function calculateRadius(radiusInKm, latitude) {
  const degreesPerKm = 1 / 111;
  const latitudeRadians = latitude * (Math.PI / 180);
  const degreesPerKmAtLatitude = degreesPerKm * Math.cos(latitudeRadians);
  const radiusInDegrees = radiusInKm * degreesPerKmAtLatitude;
  return radiusInDegrees;
}

export default calculateRadius;
