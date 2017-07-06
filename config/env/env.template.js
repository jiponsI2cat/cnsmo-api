'use strict';

module.exports = {
  BASE_URL: {{BASE_URL}},
  BASE_URL_LITE: {{BASE_URL_LITE}},
  MONGO_URL: {{MONGO_URL}},
  DOMAIN: {{DOMAIN}},
  PROTOCOL: {{PROTOCOL}},
  port: {{port}},
  VSD_BACKEND: {{VSD_BACKEND}},
  AUTH_BACKEND: {{AUTH_BACKEND}},
  SWAGGER: {{SWAGGER}},
  JWT_SECRET: {{JWT_SECRET}},
  VSD_TOKEN_EXPIRES: {{VSD_TOKEN_EXPIRES}},
  VNS_LITE: {
    host: {{host}},
    port: 830,
    username: {{username}},
    password: {{password}},
    algorithms: {
      kex: [
        'diffie-hellman-group-exchange-sha256',
        'diffie-hellman-group14-sha1',
        'diffie-hellman-group1-sha1']
    }
  }
};
