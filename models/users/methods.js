'use strict';

module.exports.init = function (schema, modelName) {
  UserSchema.statics.getByusername = function (username, email) {
    var deferred = Q.defer();
    this.find({ username: username })
      .populate({ path: 'system.vsd', match: { email: email } })
      .lean()
      .exec((err, response) => {
        if (response && _.isArray(response)) {
          response = response.filter((user) => {
            return (user && _.has(user, 'system.vsd') && user.system.vsd);
          });
        }
        response = _.first(response);
        if (err) {
          deferred.reject(err);
        } else {
          deferred.resolve(response, response || null);
        }
      });
    return deferred.promise;
  };

  UserSchema.statics.authenticate = function(username, password) {

  } 

  UserSchema.statics.add = function (username, password, system, cb) {
    var data = {
      username: username,
      password: password, system: system
    };
    var user = new CNSMOUser(data);
    return user.save(cb);
  };

  UserSchema.statics.addVSDUser =
    function (username, password,
      email, cb) {

      var VSDUser = db.model('VSDUser');

      var vsdUser = new VSDUser(
        {
          username: username,
          password: password,
          email: email

        });

      vsdUser.save((err, user) => {
        if (err) {

          cb(err);
        } else {
          var system = { vsd: vsdUser._id };
          return CNSMOUser.add(username, password, system, cb);
        }
      });
    };

  UserSchema.statics.updatePassword =
    function (username, email, password, cb) {
      this.find({ username: username })
        .populate({ path: 'system.vsd', match: { email: email } })
        .exec((err, response) => {
          if (err) {
            return cb(err);
          }

          if (response && _.isArray(response)) {
            response = response.filter((user) => {
              user = user.toObject();
              return (user && _.has(user, 'system.vsd') && user.system.vsd);
            });
          }
          response = _.first(response);
          if (response) {
            logger.debug('Updating password for user:', response);
            response.password = password;
            response.system.vsd.password = password;
            response.save((err) => {
              if (err) {
                cb(err);
              } else {
                response.system.vsd.save(cb);
              }
            });
          } else {
            cb('User not found or does not have an associated VSDUser');
          }
        });
    };

  UserSchema.statics.deleteVSDUser =
    function (username, cb) {
      var VSDUser = db.model('VSDUser');

      VSDUser.delete((err, vsdUser) => {
        if (err) {
          cb(err);
        } else {
          return this.remove({ username: username, 'system.vsd': vsdUser._id }, cb);
        }

      });
    };

  UserSchema.statics.deleteVSDUsers =
    function () {
      var deferred = Q.defer();
      this.find({})
        .populate({ path: 'system.vsd', match: {: } })
        .lean()
        .exec((err, response) => {
          if (response && _.isArray(response)) {
            response = response.filter((user) => {
              return (user && _.has(user, 'system.vsd') && user.system.vsd);
            });
          }

          if (response.length > 0) {
            const CNSMOUserIds = response.map((user) => {
              return user._id;
            });

            const vsdUserIds = response.map((user) => {
              return user.system.vsd._id;
            });

            this.remove({ _id: { $in: CNSMOUserIds } }, (err) => {
              if (err) {
                return deferred.reject(err);
              } else {
                var VSDUser = db.model('VSDUser');
                VSDUser.remove({ _id: { $in: vsdUserIds } }, (err) => {
                  if (err) {
                    return deferred.reject(err);
                  } else {
                    const result = response.map((user) => {
                      return user.username;
                    });

                    return deferred.resolve(result);
                  }
                });
              }
            });
          } else {
            return deferred.resolve([]);
          }
        });
      return deferred.promise;
    };

  return schema;
};
