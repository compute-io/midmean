'use strict';

// FUNCTIONS //

var ascending = require( './ascending.js' );

//  MIDMEAN //

/**
* FUNCTION: midmean( arr, clbk[, sorted] )
*	Computes the interquartile mean (midmean) of a numeric array.
*
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @param {Function} clbk - accessor function for accessing array values
* @param {Boolean} [sorted=false] - boolean flag indicating if the input array is sorted in ascending order
* @returns {Number|Null} midmean or null
*/
function midmean( arr, clbk, sorted ) {
	var len = arr.length,
		low,
		high,
		delta,
		values,
		mean = 0,
		N = 0,
		i;

	if ( !len || arr.length < 3 ) {
		return null;
	}

	// Quartiles sit between values...
	if ( len%4 === 0 ) {
		low = len*0.25;
		high = len*0.75 - 1;
	}
	else {
		low = Math.ceil( len*0.25 );
		high = Math.floor( len*0.75 ) - 1;
	}

	if ( !sorted ) {
		values = [];
		for ( i = 0; i < len; i++ ) {
			values.push( clbk( arr[ i ], i ) );
		}
		values.sort( ascending );

		// Compute an arithmetic mean...
		for ( i = low; i <= high; i++ ) {
			N += 1;
			delta = values[ i ] - mean;
			mean += delta / N;
		}
		return mean;
	} else {
		// Compute an arithmetic mean...
		for ( i = low; i <= high; i++ ) {
			N += 1;
			delta = clbk( arr[ i ], i ) - mean;
			mean += delta / N;
		}
		return mean;
	}

} // end FUNCTION midmean()


// EXPORTS //

module.exports = midmean;
