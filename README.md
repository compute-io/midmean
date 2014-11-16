Midmean
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the [interquartile mean](http://www.jstor.org/stable/1268431) (midmean) of a numeric array.


## Installation

``` bash
$ npm install compute-midmean
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var midmean = require( 'compute-midmean' );
```

#### midmean( arr[, sorted] )

Computes the [midmean](http://www.jstor.org/stable/1268431) of a numeric `array`.

``` javascript
var unsorted = [ 5, 6, 7, 2, 1, 8, 4, 3 ];

var mean = midmean( unsorted );
// returns 4.5
```

If the input `array` is already `sorted` in __ascending__ order, set the optional second argument to `true`.

``` javascript
var sorted = [ 1, 2, 3, 4, 5, 6, 7, 8 ];

var mean = midmean( sorted, true );
// returns 4.5
```


## Examples

``` javascript
var data = new Array( 100 );

for ( var i = 0; i < data.length; i++ ) {
    data[ i ] = Math.round( Math.random()*100 );
}

console.log( midmean( data ) );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```

## Notes

If provided an unsorted input `array`, the function is `O( N log(N) + m )`, where `N` is the input `array` length and `m` is the number of values located between the first and third quartiles. If the input `array` is already sorted in __ascending__ order, the function is `O(m)`.

The midmean includes the values located between *but not including* the first and third quartiles. In the following examples, the values included in the midmean are in bold.

* 	[1,2,__3,4,5,6__,7,8] -> midmean: 4.5
*	[1,2,__3,4,5__,6,7] -> midmean: 4



## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Rebekah Smith.


[npm-image]: http://img.shields.io/npm/v/compute-midmean.svg
[npm-url]: https://npmjs.org/package/compute-midmean

[travis-image]: http://img.shields.io/travis/compute-io/midmean/master.svg
[travis-url]: https://travis-ci.org/compute-io/midmean

[coveralls-image]: https://img.shields.io/coveralls/compute-io/midmean/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/midmean?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/midmean.svg
[dependencies-url]: https://david-dm.org/compute-io/midmean

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/midmean.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/midmean

[github-issues-image]: http://img.shields.io/github/issues/compute-io/midmean.svg
[github-issues-url]: https://github.com/compute-io/midmean/issues
