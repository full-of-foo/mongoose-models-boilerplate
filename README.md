Mongoose Models Boilerplate
==========

Just enough boilerplate to get you meaningfully going with Mongoose 4+. The boilerplate here can
be cargo culted itself into your own repo. Alternatively, you can clone or fork it, and publish it as your own independent model package to be used by your services.

The tooling set up is as follows:
 * Mongoose 4+
 * Babel Es6 pipeline
 * Jasmine test pipeline
 * Dockerised Xenial image (for running test containers and containers for publishing the npm package)


## Example
```
# build the package (within le container)
$ docker-compose build && docker-compose run mongoose-models-boilerplate /bin/bash

# install the node package
$ npm link mongoose-models-boilerplate

# connect to mongo and begin working against documents
$ node -e "\
  // allow one connect to the given URI, and optionally seed
  var db = require('mongoose-models-boilerplate').db; \
  // example model
  var User = require('mongoose-models-boilerplate').User; \

  db({dbUri: 'mongo/test:27017', isSeeded: true}, function() { \
    // use custom utility functions on models that return Bluebird promises
    User.upsert({email: 'foo@bar.co'}, {email: 'new@email.co'})
      .then(function(users) { \
        console.log(users); \
      }); \
  });";
```

## Usage
To have your independent models package, clone the repo and `cd` into it. Rename all occurrences of `mongoose-models-boilerplate` to whatever you want. Build and publish your package with:
```
$ docker-compose build && docker-compose run mongoose-models-boilerplate /bin/bash -c "npm login && node_modules/.bin/babel -d lib/ src/ && npm publish" | cat
$ docker-compose down
```

## Testing
```
$ docker-compose build && docker-compose run mongoose-models-boilerplate npm test | cat
$ docker-compose down
```
