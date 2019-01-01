'use strict';

// FUNCTIONS //

var ascending = require( './ascending.js' );

//  MIDMEAN //

/**
* FUNCTION: midmean( arr[, sorted] )
*	Computes the interquartile mean (midmean) of a numeric array.
*
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @param {Boolean} [sorted=false] - boolean flag indicating if the input array is sorted in ascending order
* @returns {Number|Null} midmean or null
*/
function midmean( arr, sorted ) {
	var len = arr.length,
		low,
		high,
		delta,
		mean = 0,
		N = 0,
		i;

	if ( len < 3) {
		return null;
	}

	if ( !sorted ) {
		arr = Array.prototype.slice.call( arr );
		// Borrow prototype method as typed arrays do not have sort
		Array.prototype.sort.call( arr, ascending );
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

	// Compute an arithmetic mean...
	for ( i = low; i <= high; i++ ) {
		N += 1;
		delta = arr[ i ] - mean;
		mean += delta / N;
	}
	return mean;

} // end FUNCTION midmean()


// EXPORTS //

module.exports = midmean;
