'use strict';

module.exports = {
  BASE_URL: '/cnsmo',
  MONGO_URL: 'mongodb://localhost/cnsmo',
  DOMAIN: '127.0.0.1',
  PROTOCOL: 'http',
  port: process.env.PORT || 8083,
  VSD_BACKEND: 'https://10.0.1.2:8443/nuage/api/v3_2/',
  AUTH_BACKEND: 'http://localhost:8081',
  SWAGGER: true,
  JWT_SECRET: 'cnsmosecret',
  VSD_TOKEN_EXPIRES: (60 * 60 * 6) + 120,
  VNS_LITE: {
    host: '10.0.1.5',
    port: 830,
    username: 'admin',
    password: '*****',
    algorithms: {
      kex: [
        'diffie-hellman-group-exchange-sha256',
        'diffie-hellman-group14-sha1',
        'diffie-hellman-group1-sha1']
    }
  },
  LDAP: {
    host: '10.0.1.80',
    port: 389,
    username: 'admin',
    password: '*****',
    dc: 'dc=cnsmo,dc=com',
    ou: 'ou=People'
  }
};
