Midmean
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the [interquartile mean](http://www.jstor.org/stable/1268431) (midmean).


## Installation

``` bash
$ npm install compute-midmean
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage


``` javascript
var midmean = require( 'compute-midmean' );
```

#### midmean( x[, opts] )

Computes the [midmean](http://www.jstor.org/stable/1268431). `x` may be either an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var unsorted = [ 5, 6, 7, 2, 1, 8, 4, 3 ];
var mean = midmean( unsorted );
// returns 4.5

unsorted = new Int8Array( unsorted );
mean = midmean( unsorted );
// returns 4.5
```

Note: the input array must contain 3 or more elements, otherwise the function returns `null`.

If the input `array` is already `sorted` in __ascending__ order, set the `sorted` option to `true`.

``` javascript
var sorted = [ 1, 2, 3, 4, 5, 6, 7, 8 ];

var mean = midmean( sorted, {
    'sorted': true
});
// returns 4.5
```

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	{'x':2},
	{'x':4},
	{'x':5},
	{'x':3},
	{'x':8},
	{'x':2}
];

function getValue( d, i ) {
	return d.x;
}

var mu = midmean( data, {
	'accessor': getValue
});
// returns 3.5
```

If provided a [`matrix`](https://github.com/dstructs/matrix), the function accepts the following `options`:

*	__dim__: dimension along which to compute the [midmean](http://www.jstor.org/stable/1268431). Default: `2` (along the columns).
*	__dtype__: output [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.

By default, the function computes the [midmean](http://www.jstor.org/stable/1268431) along the columns (`dim=2`).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	mu,
	i;

data = new Int8Array( 25 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [5,5], 'int8' );
/*
	[  0  1  2  3  4
	   5  6  7  8  9
	  10 11 12 13 14
	  15 16 17 18 19
	  20 21 22 23 24 ]
*/

mu = midmean( mat );
/*
	[  2
	   7
	  12
	  17
	  22 ]
*/
```

To compute the [midmean](http://www.jstor.org/stable/1268431) along the rows, set the `dim` option to `1`.

``` javascript
mu = midmean( mat, {
	'dim': 1
});
/*
	[ 10, 11, 12, 13, 14 ]
*/
```

By default, the output [`matrix`](https://github.com/dstructs/matrix) data type is `float64`. To specify a different output data type, set the `dtype` option.

``` javascript
mu = midmean( mat, {
	'dim': 1,
	'dtype': 'uint8'
});
/*
	[ 10, 11, 12, 13, 14 ]
*/

var dtype = mu.dtype;
// returns 'uint8'
```

If provided a [`matrix`](https://github.com/dstructs/matrix) having either dimension equal to `1`, the function treats the [`matrix`](https://github.com/dstructs/matrix) as a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) and returns a `numeric` value.

``` javascript
data = [ 2, 4, 5, 3, 8, 2 ];

// Row vector:
mat = matrix( new Int8Array( data ), [1,6], 'int8' );
mu = midmean( mat );
// returns 3.5

// Column vector:
mat = matrix( new Int8Array( data ), [6,1], 'int8' );
mu = midmean( mat );
// returns 3.5
```

If provided an empty [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or [`matrix`](https://github.com/dstructs/matrix), the function returns `null`.

``` javascript
mu = midmean( [] );
// returns null

mu = midmean( new Int8Array( [] ) );
// returns null

mu = midmean( matrix( [0,0] ) );
// returns null

mu = midmean( matrix( [0,10] ) );
// returns null

mu = midmean( matrix( [10,0] ) );
// returns null
```

## Notes

If provided an unsorted input `array`, the function is `O( N log(N) + m )`, where `N` is the input `array` length and `m` is the number of values located between the first and third quartiles. If the input `array` is already sorted in __ascending__ order, the function is `O(m)`.

The midmean includes the values located between *but not including* the first and third quartiles. In the following examples, the values included in the midmean are in bold.

* 	[1,2,__3,4,5,6__,7,8] -> midmean: 4.5
*	[1,2,__3,4,5__,6,7] -> midmean: 4

## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	midmean = require( 'compute-midmean' );

var data,
	mat,
	mu,
	i;


// ----
// Plain arrays...
data = new Array( 1000 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
mu = midmean( data );


// ----
// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
mu = midmean( data, {
	'accessor': getValue
});


// ----
// Typed arrays...
data = new Int32Array( 1000 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
mu = midmean( data );


// ----
// Matrices (along rows)...
mat = matrix( data, [100,10], 'int32' );
mu = midmean( mat, {
	'dim': 1
});


// ----
// Matrices (along columns)...
mu = midmean( mat, {
	'dim': 2
});


// ----
// Matrices (custom output data type)...
mu = midmean( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```

## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

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


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2014-2015. The [Compute.io](https://github.com/compute-io) Authors.


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
