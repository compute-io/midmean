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
		i;

	data = new Int32Array( 25 );
	for ( i = 0; i < data.length; i++ ) {
		data[ i ] = i + 1;
	}
	mat = matrix( data, [5,5], 'int8' );


	it( 'should export a function', function test() {
		expect( midmean ).to.be.a( 'function' );
	});

	it( 'should compute the midmean along matrix columns', function test() {
		var out, p, expected;

		out = matrix( [5,1], 'float64' );

		p = midmean( out, mat );
		expected = '3;8;13;18;23';

		assert.strictEqual( p.toString(), expected );

		p = midmean( out, mat, false, 2 );
		expected = '3;8;13;18;23';

		assert.strictEqual( p.toString(), expected );
	});

    it( 'should compute the midmean along matrix columns for already sorted rows', function test() {
        var out, p, expected;

        out = matrix( [5,1], 'float64' );

        p = midmean( out, mat, true );
        expected = '3;8;13;18;23';

        assert.strictEqual( p.toString(), expected );

        p = midmean( out, mat, true, 2 );
        expected = '3;8;13;18;23';

        assert.strictEqual( p.toString(), expected );
    });

	it( 'should compute the midmean along matrix rows', function test() {
		var out, p, expected;

		out = matrix( [1,5], 'float64' );

		p = midmean( out, mat, false, 1 );
		expected = '11,12,13,14,15';

		assert.strictEqual( p.toString(), expected );
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

});
