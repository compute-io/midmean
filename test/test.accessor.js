/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	midmean = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor midmean', function tests() {

	it( 'should export a function', function test() {
		expect( midmean ).to.be.a( 'function' );
	});

	it( 'should compute the interquartile mean (midmean) for an array length divisible by 4', function test() {
		var data, expected;

		data = [
			{'x':3},
			{'x':7},
			{'x':1},
			{'x':34},
			{'x':8},
			{'x':9},
			{'x':3},
			{'x':5},
			{'x':7},
			{'x':45},
			{'x':6},
			{'x':2}
		];

		expected = 6;

		// Unsorted test:
		assert.strictEqual( midmean( data, getValue ), expected );

		// Sort the data:
		data.sort( function sort( a, b ) {
			return a.x - b.x;
		});

		// Sorted test:
		assert.strictEqual( midmean( data, getValue, true ), expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should compute the interquartile mean (midmean) for an array length not divisible by 4', function test() {
		var data, expected;

		data = [
			{'x':3},
			{'x':7},
			{'x':1},
			{'x':34},
			{'x':8},
			{'x':9},
			{'x':3},
			{'x':5},
			{'x':7},
			{'x':45},
			{'x':8}
		];

		expected = 7;

		// Unsorted test:
		assert.strictEqual( midmean( data, getValue ), expected );

		// Sort the data:
		data.sort( function sort( a, b ) {
			return a.x - b.x;
		});

		// Sorted test:
		assert.strictEqual( midmean( data, getValue, true ), expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( midmean( [], getValue ) );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return null if provided an array of insufficient length', function test() {
		var data = [
			{'x': 2},
			{'x': 5}
		];

		assert.isNull( midmean( data, getValue ) );

		function getValue( d ) {
			return d.x;
		}

	});

});
