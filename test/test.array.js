/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	midmean = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array midmean', function tests() {

	it( 'should export a function', function test() {
		expect( midmean ).to.be.a( 'function' );
	});


	it( 'should compute the interquartile mean (midmean) for an array length divisible by 4', function test() {
		var data, expected;

		data = [ 3, 7, 1, 34, 8, 9, 3, 5, 7, 45, 6, 2 ];
		expected = 6;

		// Unsorted test:
		assert.strictEqual( midmean( data ), expected );

		// Sort the data:
		data.sort( function sort( a, b ) {
			return a - b;
		});

		// Sorted test:
		assert.strictEqual( midmean( data, true ), expected );
	});

	it( 'should compute the interquartile mean (midmean) for an array length not divisible by 4', function test() {
		var data, expected;

		data = [ 3, 7, 1, 34, 8, 9, 3, 5, 7, 45, 8 ];
		expected = 7;

		// Unsorted test:
		assert.strictEqual( midmean( data ), expected );

		// Sort the data:
		data.sort( function sort( a, b ) {
			return a - b;
		});

		// Sorted test:
		assert.strictEqual( midmean( data, true ), expected );
	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( midmean( [] ) );
	});

	it( 'should return null if provided an array of insufficient length', function test() {
		var data = [2, 5];

		assert.isNull( midmean( data ) );

	});

});
