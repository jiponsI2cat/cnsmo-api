016-20-09 README.md(c) i2Cat

mod_common
===========

mod_common provides common funcionalities for sdpn_server and mod_auth modules.

### Configuration

In order to use mod_common follow these steps:

I. Include the the mod_common module in dependencies your package.json:  
```
"mod_common": "git+https://seg_user:password@stash.i2cat.net/scm/sdpn/mod_common.git"  
```  

Notice that password should be encoded in order to work properly with special characters.  

In the future please consider to implement our own npm registry. Take a look at Sinopia: https://www.npmjs.com/package/sinopia

II. provide the following configuration and call the start method as follows:

```
var common = require('mod_common');

var config =  {
    VSD_TOKEN_EXPIRES: 2600,
    JWT_SECRET: 'nuage',
    MONGO_URL: mongodb://localhost
  };

common.start(config);

```

The following parameters are required by the module in order to work properly.  
Notice that these parameters are also use by mod_auth and sdpn_server  


```
VSD_TOKEN_EXPIRES: This value (in seconds) sets the expiration time (TTL)  of the TokenVSDUser documents stored in the mongo.
JWT_SECRET: Secret to sign and verify SDPN tokens.
MONGO_URL: MongoDB url
```

### Functionalities

#### Middlewares

##### auth

```
common.middlewares.auth.verifyAuth(req,res,next);
```

1. Verifies the signature of the SDPN token.  
   1.1 If not unauthorized  
2. Decodes token info and sets the data in req.user.  
3. Check if token in present in TokenVSDUser collection.  
   3.1 If not unathorized  
4. Sets VSDUser data in req.vsd. Also saves VSDS token in req.vsd.token.  


### Models

####TokenVSDUser

```
common.models.TokenVSDUser;  
```

This method sets a relation between the SDPN token and a given VSDUser. The schema of this model uses a TTL index (rounded to the nearest second) in order to expire tokens acording to the VSD_TOKEN_EXPIRES configuration field.

## Author/s
Santi Pérez <santi.perez@i2cat.net>