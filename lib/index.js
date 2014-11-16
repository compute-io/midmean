/**
*
*	COMPUTE: midmean
*
*
*	DESCRIPTION:
*		- Computes the interquartile mean (midmean) of a numeric array.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Rebekah Smith.
*
*
*	AUTHOR:
*		Rebekah Smith. rebekahjs17@gmail.com. 2014.
*
*/

'use strict';

// FUNCTIONS //

/**
* FUNCTION: ascending( a, b )
*	Comparator function used to sort values in ascending order.
*
* @private
* @param {Number} a
* @param {Number} b
* @returns {Number} difference between `a` and `b`
*/
function ascending( a, b ) {
	return a - b;
} // end FUNCTION ascending()


// MIDMEAN //

/**
* FUNCTION: midmean( arr[, sorted] )
*	Computes the interquartile mean (midmean) of a numeric array.
*
* @param {Array} arr - numeric array
* @param {Boolean} [sorted] - boolean flag indicating if the input array is sorted in ascending order
* @returns {Number} midmean
*/
function midmean( arr, sorted ) {
	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'midmean()::invalid input argument. Must provide an array.' );
	}
	if ( arguments.length > 1 && typeof sorted !== 'boolean' ) {
		throw new TypeError( 'midmean()::invalid input argument. Second argument must be a boolean.' );
	}
	if ( arr.length < 3 ) {
		throw new TypeError( 'midmean()::invalid input argument. Midmean not applicable.' );
	}
	if ( !sorted ) {
		arr = arr.slice();
		arr.sort( ascending );
	}
	var len = arr.length,
		mean = 0,
		N = 0,
		delta,
		low,
		high;

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
	for ( var i = low; i <= high; i++ ) {
		N += 1;
		delta = arr[ i ] - mean;
		mean += delta / N;
	}
	return mean;
} // end FUNCTION midmean()


// EXPORTS //

module.exports = midmean;
