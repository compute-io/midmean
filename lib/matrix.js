'use strict';

// FUNCTIONS //

var ascending = require( './ascending.js' );

// MIDMEAN //

/**
* FUNCTION: midmean( out, mat[, sorted[, dim] ] )
*	Computes the midmean along a matrix dimension.
*
* @param {Matrix} out - output matrix
* @param {Matrix} mat - input matrix
* @param {Boolean} [sorted=false] - boolean flag indicating if the rows / columns are already sorted in ascending order
* @param {Number} [dim=2] - matrix dimension along which to compute the maximum. If `dim=1`, compute along matrix rows. If `dim=2`, compute along matrix columns.
* @returns {Matrix|Null} midmean or null
*/
function midmean( out, mat, sorted, dim ) {
	var values,
		delta,
		mean, Nobs,
		M, N, o,
		s0, s1,
		i, j, k,
		low, high;

	if ( dim === 1 ) {
		// Compute along the rows...
		M = mat.shape[ 1 ];
		N = mat.shape[ 0 ];
		s0 = mat.strides[ 1 ];
		s1 = mat.strides[ 0 ];
	} else {
		// Compute along the columns...
		M = mat.shape[ 0 ];
		N = mat.shape[ 1 ];
		s0 = mat.strides[ 0 ];
		s1 = mat.strides[ 1 ];
	}
	if ( M === 0 || N === 0 ) {
		return null;
	}
	if ( N < 3 ) {
		return null;
	}

	// matrix offset
	o = mat.offset;

	// Quartiles sit between values...
	if ( N%4 === 0 ) {
		low = N*0.25;
		high = N*0.75 - 1;
	}
	else {
		low = Math.ceil( N*0.25 );
		high = Math.floor( N*0.75 ) - 1;
	}
	if ( sorted ) {
		for ( i = 0; i < M; i++ ) {
			mean = 0;
			Nobs = 0;
			k = o + i*s0;
			// Compute an arithmetic mean...
			for ( j = low; j <= high; j++ ) {
				Nobs += 1;
				delta =  mat.data[ k + j*s1 ] - mean;
				mean += delta / Nobs;
			}
			out.data[ i ] = mean;
		}
	} else {
		for ( i = 0; i < M; i++ ) {
			mean = 0;
			Nobs = 0;
			k = o + i*s0;
			values = [];
			for ( j = 0; j < N; j++ ) {
				values.push( mat.data[ k + j*s1 ] );
			}
			values.sort( ascending );
			// Compute an arithmetic mean...
			for ( j = low; j <= high; j++ ) {
				Nobs += 1;
				delta =  values[ j ] - mean;
				mean += delta / Nobs;
			}
			out.data[ i ] = mean;
		}
	}
	return out;
} // end FUNCTION midmean()


// EXPORTS //

module.exports = midmean;
