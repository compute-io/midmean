
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	iqm = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-iqm', function tests() {
	'use strict';

	it( 'should export a function', function test() {
		expect( iqm ).to.be.a( 'function' );
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
				iqm( value, true );
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
				iqm( [], value );
			};
		}
	});

	it( 'should compute the interquartile mean', function test() {
		var data, expected;

		// Array divides by 4
		data = [ 5, 8, 4, 38, 8, 6, 9, 7, 7, 3, 1, 6 ];
		expected = 6.5;

		// unsorted test
		assert.strictEqual( iqm( data ), expected );

		// Sort the data:
		data.sort( function sort( a, b ) {
			return a - b;
		});

		// sorted test
		assert.strictEqual( iqm( data, true ), expected );

		// Array does not divide by 4
		data = [ 17, 3, 5, 13, 11, 9, 7, 15, 1 ];
		expected = 9;
		assert.strictEqual( iqm( data ), expected );
	});

});