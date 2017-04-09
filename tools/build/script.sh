
# build umd
export NODE_ENV=umd

./node_modules/.bin/webpack -p --config ./tools/build/config.js

# build es
export NODE_ENV=es

./node_modules/.bin/babel source -d es
