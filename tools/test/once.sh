# test once with coverage
export NODE_ENV=umd

# run tests once
./node_modules/.bin/nyc ./node_modules/.bin/ava

# cleanup
rm -rf ./.nyc_output
