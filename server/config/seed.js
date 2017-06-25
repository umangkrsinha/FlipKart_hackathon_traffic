/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import TrafficData, DeviceData from '../api/trafficData/trafficData.model';
import config from './environment/';

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    Thing.find({}).remove()
      .then(() => {
        let thing = Thing.create({
          name: 'Development Tools',
          info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, '
                + 'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, '
                + 'Stylus, Sass, and Less.'
        }, {
          name: 'Server and Client integration',
          info: 'Built with a powerful and fun stack: MongoDB, Express, '
                + 'AngularJS, and Node.'
        }, {
          name: 'Smart Build System',
          info: 'Build system ignores `spec` files, allowing you to keep '
                + 'tests alongside code. Automatic injection of scripts and '
                + 'styles into your index.html'
        }, {
          name: 'Modular Structure',
          info: 'Best practice client and server structures allow for more '
                + 'code reusability and maximum scalability'
        }, {
          name: 'Optimized Build',
          info: 'Build process packs up your templates as a single JavaScript '
                + 'payload, minifies your scripts/css/images, and rewrites asset '
                + 'names for caching.'
        }, {
          name: 'Deployment Ready',
          info: 'Easily deploy your app to Heroku or Openshift with the heroku '
                + 'and openshift subgenerators'
        });
        return thing;
      })
      .then(() => console.log('finished populating things'))
      .catch(err => console.log('error populating things', err));

    DeviceData.find({}).remove()
    .then(() => {
        DeviceData.create({
          junction: 1,
          lat: 0,
          lon: 0
        },{
          junction: 2,
          lat:1,
          lon:1
        }, {
          junction: 3,
          lat: 3,
          lon: 3
        }, {
          junction: 4,
          lat: 4,
          lon: 4
        })
        .then(() => console.log('finished populating DeviceData'))
        .catch(err => console.log('error populating DeviceData', err));
    });

    TrafficData.find({}).remove()
      .then(() => {
        TrafficData.create({
          device: 1,
          timestamp: 1,
          macadd: '1111.1111.1111.1111'
        },{
          device: 2,
          timestamp: 2,
          macadd: '2222.2222.2222.2222'
        },{
          device: 3,
          timestamp: 3,
          macadd: '3333.3333.3333.3333'
        },{
          device: 4,
          timestamp: 4,
          macadd: '4444.4444.4444.4444'
        })
        .then(() => console.log('finished populating TrafficData'))
        .catch(err => console.log('error populating TrafficData', err));
      });

    User.find({}).remove()
      .then(() => {
        User.create({
          provider: 'local',
          name: 'Test User',
          email: 'test@example.com',
          password: 'test'
        }, {
          provider: 'local',
          role: 'admin',
          name: 'Admin',
          email: 'admin@example.com',
          password: 'admin'
        })
        .then(() => console.log('finished populating users'))
        .catch(err => console.log('error populating users', err));
      });
  }
}
