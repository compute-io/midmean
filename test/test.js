/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

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

	it( 'should throw an error if the first argument is neither array-like or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
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
				midmean( value );
			};
		}
	});

	it( 'should throw an error if provided a dimension which is greater than 2 when provided a matrix', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				midmean( matrix( [2,2] ), {
					'dim': value
				});
			};
		}
	});

	it( 'should throw an error if provided an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				midmean( matrix( [2,2] ), {
					'dtype': value
				});
			};
		}
	});

	it( 'should compute the midmean', function test() {
		var data, expected;

		data = [ 2, 4, 5, 3, 8, 2 ];
		expected = 3.5;

		assert.strictEqual( midmean( data ), expected );
	});

	it( 'should compute the midmean of a typed array', function test() {
		var data, expected;

		data = new Int8Array( [ 2, 4, 5, 3, 8, 2 ] );
		expected = 3.5;

		assert.strictEqual( midmean( data ), expected );
	});

	it( 'should compute the midmean using an accessor function', function test() {
		var data, expected, actual;

		data = [
			{'x':2},
			{'x':4},
			{'x':5},
			{'x':3},
			{'x':8},
			{'x':2}
		];

		expected = 3.5;
		actual = midmean( data, {
			'accessor': getValue
		});

		assert.strictEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should compute the midmean along a matrix dimension', function test() {
		var expected,
			data,
			mat,
			mu,
			i;

		data = new Int8Array( 25 );
		for ( i = 0; i < data.length; i++ ) {
			data[ i ] = i;
		}
		mat = matrix( data, [5,5], 'int8' );

		// Default:
		mu = midmean( mat );
		expected = '2;7;12;17;22';

		assert.strictEqual( mu.toString(), expected, 'default' );

		// Along columns:
		mu = midmean( mat, {
			'dim': 2
		});
		expected = '2;7;12;17;22';

		assert.strictEqual( mu.toString(), expected, 'dim: 2' );

		// Along rows:
		mu = midmean( mat, {
			'dim': 1
		});
		expected = '10,11,12,13,14';

		assert.strictEqual( mu.toString(), expected, 'dim: 1' );
	});

	it( 'should compute the midmean of 1d matrices (vectors)', function test() {
		var data, mat;

		data = [ 2, 4, 5, 3, 8, 2 ];

		// Row vector:
		mat = matrix( data, [1,6], 'int8' );
		assert.strictEqual( midmean( mat ), 4 );

		// Column vector:
		mat = matrix( data, [6,1], 'int8' );
		assert.strictEqual( midmean( mat ), 4 );
	});

});
