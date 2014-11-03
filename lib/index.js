/**
*
*	COMPUTE: iqm
*
*
*	DESCRIPTION:
*		- Computes the interquartile mean for an array of numerical values.
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

(function() {

	'use strict';

	/**
	* FUNCTION: iqm( arr[, sorted] )
	* Computes the interquartile mean for an array.
	*
	* @param {Array} arr - array of values
	* @param {Boolean} [sorted] - boolean flag indicating if the input array is pre-sorted
	* @returns {Number} iqm
	*/
	function iqm( arr, sorted ) {
		if ( !Array.isArray( arr ) ) {
			throw new TypeError( 'iqm()::invalid input argument. Must provide an array.')
		}
		if ( arguments.length > 1 && typeof sorted !== 'boolean' ) {
			throw new TypeError( 'iqm()::invalid input argument. Second argument must be a boolean.')
		}

		// If needed, copy and sort input array:
		if ( !sorted ) {
			arr = arr.slice();
			arr.sort( function sort( a, b ) {
				return a - b;
			});
		}

		var iqmean = 0,
			len = arr.length,
			perQ = 0,
			id_q1 = 0,
			id_q3 = 0,
			frac = 0;

		// Values per quartile:
		perQ = len / 4.0;

		if ( perQ === Math.floor( perQ )) {
			// Array divides by 4, no fractional values needed
			for ( var i = perQ; i < len - perQ; i++ ) {
				iqmean += arr[i] / ( 2 * perQ ); 
			}
		}
		else { 
			// Array does not divide by 4, fractions of edge values needed
			frac = Math.ceil( perQ ) - perQ;
			id_q1 = Math.ceil( len * 0.25 ) - 1;
			id_q3 = Math.ceil( len * 0.75 ) - 1;

			// Sum central terms:
			for ( var i = id_q1 + 1; i < id_q3; i++ ) {
				iqmean += arr[i] / ( 2 * perQ ); 
			}
			// Add fractions of edge terms
			iqmean += frac * ( arr[ id_q1 ] + arr[ id_q3 ] ) / ( 2 * perQ );

		}

		return iqmean;

	} // end FUNCTION iqm()

	// EXPORTS //

	module.exports = iqm;


})();
