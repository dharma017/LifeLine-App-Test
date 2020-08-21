// packages
// import polyline from '@mapbox/polyline';
import { lineString as makeLineString } from '@turf/helpers';
const mbxDirection = require('@mapbox/mapbox-sdk/services/directions');

// env
import { MAPBOX_API_KEY } from 'react-native-dotenv';

const directionsClient = mbxDirection({ accessToken: MAPBOX_API_KEY });

function makeRoutesLineStringList(routes) {
  console.log(
    'routes list:',
    routes.map(route => makeLineString(route.geometry.coordinates))
  );
}

function getRoute(startLocation, destination) {
  return new Promise((resolve, reject) => {
    directionsClient
      .getDirections({
        waypoints: [
          { coordinates: startLocation },
          { coordinates: destination.center }
        ],
        geometries: 'geojson',
        // geometries: 'polyline6',
        profile: 'driving-traffic',
        annotations: ['speed', 'distance', 'duration']
      })
      .send()
      .then(
        response => {
          // console.log('routes:', response);

          makeRoutesLineStringList(response.body.routes);

          resolve({
            distance: response.body.routes[0].distance / 1000,
            route: makeLineString(
              response.body.routes[0].geometry.coordinates
              // polyline.decode(response.body.routes[0].geometry, 6)
              // polyline.toGeoJSON(response.body.routes[0].geometry, 6)
            )
          });
        },
        error => {
          console.log('Direction error:', error);
          reject(error);
        }
      );
  });
}

export default getRoute;
