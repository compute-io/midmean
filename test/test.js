'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	midmean = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-midmean', function tests() {

	it( 'should export a function', function test() {
		expect( midmean ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a non-array', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				midmean( value, true );
			};
		}
	});

	it( 'should throw an error if provided a non-boolean for the second argument', function test() {
		var values = [
			'5',
			5,
			[],
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				midmean( [], value );
			};
		}
	});

	it( 'should throw an error if provided an array of insufficient length', function test() {
		var data = [2, 5];

		function badValue( array ) {
			return function() {
				midmean( array );
			};
		}		

		expect( badValue( data ) ).to.throw( TypeError );

	});

	it( 'should compute the interquartile mean (midmean) for len divisible by 4', function test() {
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

	it( 'should compute the interquartile mean (midmean) for len not divisible by 4', function test() {
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

});
