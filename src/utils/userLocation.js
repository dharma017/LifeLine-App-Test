import Geolocation from '@react-native-community/geolocation';

class UserLocation {
  #userLocation = null;

  init() {
    console.log('UserLocation.init()');

    Geolocation.getCurrentPosition(
      sucess => {
        this.#userLocation = [sucess.coords.longitude, sucess.coords.latitude];
      },
      error => {
        console.log('getCurrentPosition error:', error);
      },
      {
        timeout: 10 * 1000,
        maximumAge: 20 * 1000
        //enableHighAccuracy: true /* Not supporten in my phone (Android 5.1.1) */
      }
    );

    Geolocation.watchPosition(
      sucess => {
        this.#userLocation = [sucess.coords.longitude, sucess.coords.latitude];
      },
      error => {
        console.log('watchPosition error:', error);
      },
      {
        distanceFilter: 10,
        timeout: 10 * 1000,
        maximumAge: 50 * 1000,
        enableHighAccuracy: true
      }
    );
  }

  get currentLocation() {
    return this.#userLocation;
  }
}

export default new UserLocation();
