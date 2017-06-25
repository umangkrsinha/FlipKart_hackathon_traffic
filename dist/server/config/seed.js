/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = seedDatabaseIfNeeded;

var _thing = require('../api/thing/thing.model');

var _thing2 = _interopRequireDefault(_thing);

var _user = require('../api/user/user.model');

var _user2 = _interopRequireDefault(_user);

var _trafficData = require('../api/trafficData/trafficData.model');

var _trafficData2 = _interopRequireDefault(_trafficData);

var _deviceData = require('../api/deviceData/deviceData.model');

var _deviceData2 = _interopRequireDefault(_deviceData);

var _environment = require('./environment/');

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function seedDatabaseIfNeeded() {
  if (_environment2.default.seedDB) {
    _thing2.default.find({}).remove().then(function () {
      var thing = _thing2.default.create({
        name: 'Development Tools',
        info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, ' + 'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, ' + 'Stylus, Sass, and Less.'
      }, {
        name: 'Server and Client integration',
        info: 'Built with a powerful and fun stack: MongoDB, Express, ' + 'AngularJS, and Node.'
      }, {
        name: 'Smart Build System',
        info: 'Build system ignores `spec` files, allowing you to keep ' + 'tests alongside code. Automatic injection of scripts and ' + 'styles into your index.html'
      }, {
        name: 'Modular Structure',
        info: 'Best practice client and server structures allow for more ' + 'code reusability and maximum scalability'
      }, {
        name: 'Optimized Build',
        info: 'Build process packs up your templates as a single JavaScript ' + 'payload, minifies your scripts/css/images, and rewrites asset ' + 'names for caching.'
      }, {
        name: 'Deployment Ready',
        info: 'Easily deploy your app to Heroku or Openshift with the heroku ' + 'and openshift subgenerators'
      });
      return thing;
    }).then(function () {
      return console.log('finished populating things');
    }).catch(function (err) {
      return console.log('error populating things', err);
    });

    _deviceData2.default.find({}).remove().then(function () {
      _deviceData2.default.create({
        junction: 1,
        lat: 0,
        lon: 0
      }, {
        junction: 2,
        lat: 1,
        lon: 1
      }, {
        junction: 3,
        lat: 3,
        lon: 3
      }, {
        junction: 4,
        lat: 4,
        lon: 4
      }).then(function () {
        return console.log('finished populating DeviceData');
      }).catch(function (err) {
        return console.log('error populating DeviceData', err);
      });
    });

    _trafficData2.default.find({}).remove().then(function () {
      _trafficData2.default.create({
        device: 1,
        timestamp: 1,
        macadd: '1111.1111.1111.1111'
      }, {
        device: 2,
        timestamp: 2,
        macadd: '2222.2222.2222.2222'
      }, {
        device: 3,
        timestamp: 3,
        macadd: '3333.3333.3333.3333'
      }, {
        device: 4,
        timestamp: 4,
        macadd: '4444.4444.4444.4444'
      }).then(function () {
        return console.log('finished populating TrafficData');
      }).catch(function (err) {
        return console.log('error populating TrafficData', err);
      });
    });

    _user2.default.find({}).remove().then(function () {
      _user2.default.create({
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
      }).then(function () {
        return console.log('finished populating users');
      }).catch(function (err) {
        return console.log('error populating users', err);
      });
    });
  }
}
//# sourceMappingURL=seed.js.map
