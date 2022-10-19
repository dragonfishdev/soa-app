const ApiService = require('./ApiService');

const services = {};

services.UserService = new ApiService({
  name: 'UsersService',
  host: 'http://localhost:5001',
  uuid: '2e7a7b18-89f8-42f1-9234-a7de25293af5',
});

module.exports = services;
