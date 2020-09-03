# LifeLine-App-Test
Testing codes for LifeLine app (MAJOR PROJECT)

## Branch
+ **react-navigation-4.x**
  - Code to navigate between screens using [React Navigation *v4.x*](https://reactnavigation.org/)
  - For comparing with navigation using **react-native-router-flux**
  - Decided to use this
+ **react-native-router-flux**
  - Code to navigate between screens using [React Native Router Flux *v4.x*](https://github.com/aksonov/react-native-router-flux)
+ **envVar**
  - Trying to read the data stored in *.env* file using *process.env*. **FAILED**
+ **react-native-dotenv**
  - Read data from *.env* file using a module react-native-dotenv
  - Followed instructions this [link](https://levelup.gitconnected.com/how-to-gracefully-use-environment-variables-in-a-react-native-app-7f1600446116)
+ **mapboxMap**
  - Codes for [Mapbox Map](https://github.com/react-native-mapbox-gl/maps)
+ **searchLocation**
  - Search the for location using [Mapbox GL JS Geocoding API](https://docs.mapbox.com/mapbox-gl-js/example/mapbox-gl-geocoder/)
+ **mapboxSDK**
  - Searching for locations using [Mapbox SDK JS](https://github.com/mapbox/mapbox-sdk-js)
  - Trace route from user current location to the selected destination
+ **pickLocation**
  - Allowing the user to pick a location on Map and trace a route to that location
+ **changeUI**
  - Making a more Google Maps app like UI
  - Adding small animation
+ **addObstruction**
  - Add, update and remove certain marker on map along with small description of that marker

## Issues
Tested on **ANDROID** only
+ **on Android 5.1.1**
  - MapboxGl.Camera.setCamera() doesn't always work
  - MapboxGL.Camera.fitBounds() zooms out every time it is called eventually causing error
  - MapboxGl.MapView.onPress() is not fired after ShowRouteInfo is rendered i.e. only it is only fired once

## License
This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
