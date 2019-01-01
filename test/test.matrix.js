/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	midmean = require( './../lib/matrix.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix midmean', function tests() {

	var data,
		mat,
		mat2,
		i;

	data = new Int32Array( 25 );
	for ( i = 0; i < data.length; i++ ) {
		data[ i ] = i + 1;
	}
	mat = matrix( data, [5,5], 'int8' );
	mat2 = mat.mget( null, [ 0, 1, 2, 3 ] );

	it( 'should export a function', function test() {
		expect( midmean ).to.be.a( 'function' );
	});

	it( 'should compute the midmean along matrix columns', function test() {
		var out, midm, expected;

		out = matrix( [5,1], 'float64' );

		midm = midmean( out, mat );
		expected = '3;8;13;18;23';

		assert.strictEqual( midm.toString(), expected );

		midm = midmean( out, mat, false, 2 );
		expected = '3;8;13;18;23';

		assert.strictEqual( midm.toString(), expected );
	});

	it( 'should compute the midmean along matrix columns with row length divisible by 4', function test() {
		var out, midm, expected;

		out = matrix( [5,1], 'float64' );

		midm = midmean( out, mat2 );
		expected = '2.5;7.5;12.5;17.5;22.5';

		assert.strictEqual( midm.toString(), expected );

		midm = midmean( out, mat2, false, 2 );
		expected = '2.5;7.5;12.5;17.5;22.5';

		assert.strictEqual( midm.toString(), expected );
	});

    it( 'should compute the midmean along matrix columns for already sorted rows', function test() {
        var out, midm, expected;

        out = matrix( [5,1], 'float64' );

		midm = midmean( out, mat, true );
        expected = '3;8;13;18;23';

        assert.strictEqual( midm.toString(), expected );

		midm = midmean( out, mat, true, 2 );
        expected = '3;8;13;18;23';

        assert.strictEqual( midm.toString(), expected );
    });

	it( 'should compute the midmean along matrix rows', function test() {
		var out, midm, expected;

		out = matrix( [1,5], 'float64' );

		midm = midmean( out, mat, false, 1 );
		expected = '11,12,13,14,15';

		assert.strictEqual( midm.toString(), expected );
	});

	it( 'should return null if provided a matrix having one or more zero dimensions', function test() {
		var out, mat;

		out = matrix( [0,0] );

		mat = matrix( [0,10] );
		assert.isNull( midmean( out, mat ) );

		mat = matrix( [10,0] );
		assert.isNull( midmean( out, mat ) );

		mat = matrix( [0,0] );
		assert.isNull( midmean( out, mat ) );
	});

	it( 'should return null if provided a matrix with less than three elements on dimension for which to calculate the midmean' , function test() {
		var out, mat;

		out = matrix( [0,0] );

		mat = matrix( [ 2, 10 ] );
		assert.isNull( midmean( out, mat, false, 1 ) );

		mat = matrix( [ 10, 2 ] );
		assert.isNull( midmean( out, mat, false, 2 ) );

	});

});
