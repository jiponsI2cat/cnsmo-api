'use strict';

module.exports = {
  BASE_URL: '/api/v1',
  MONGO_URL: 'mongodb://localhost/cnsmo',
  DOMAIN: '127.0.0.1',
  PROTOCOL: 'http',
  port: process.env.PORT || 8080,
  SWAGGER: true,
  JWT_SECRET: 'cnsmosecret',
  TOKEN_EXPIRATION_DAYS: 10,
  VNS_LITE: {
    host: '10.0.1.5',
    port: 830,
    username: 'admin',
    password: 'admin',
    algorithms: {
      kex: [
        'diffie-hellman-group-exchange-sha256',
        'diffie-hellman-group14-sha1',
        'diffie-hellman-group1-sha1']
    }
  }
  
};
