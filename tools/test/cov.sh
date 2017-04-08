export NODE_ENV=testing

# source env keys
source ./tools/secret.keys

#
# generate and post coverage
#
./node_modules/.bin/nyc ./node_modules/.bin/ava &&
./node_modules/.bin/nyc report --reporter=lcov > coverage.lcov &&
./node_modules/.bin/codecov -t $CODECOV_TOKEN \
                            -p "." \
                            -X "gcov"

# cleanup
rm -rf ./.nyc_output
rm -rf ./coverage
rm coverage.lcov
