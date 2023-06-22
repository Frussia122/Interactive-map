const getCurrentPosition = () => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      localStorage.setItem('currentLatitude', latitude);
      localStorage.setItem('currentLongitude', longitude);
      resolve({ latitude, longitude });
    },
    (error) => {
      reject(new Error(error));
    },
  );
});

export default getCurrentPosition;
