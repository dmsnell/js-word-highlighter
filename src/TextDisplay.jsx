import React, { PropTypes } from 'react'
import { flowRight, zip } from 'lodash'

require( './assets/css/TextDisplay.scss' )

const mapNewlines = text => text.replace( /\n/g, "<br />" )
const transform = flowRight( mapNewlines )

const massageBreaks = (length, givenBreaks ) => {
	let breaks = givenBreaks.filter( b => b <= length )

	if ( 0 !== breaks[ 0 ] ) {
		breaks = [ 0, ...breaks ]
	}

	if ( length !== breaks[ -1 ] ) {
		breaks = [ ...breaks, length ]
	}

	return breaks
}

const breakAt = ( text, getLength, slice, givenBreaks ) => {
	const breaks = massageBreaks( getLength( text ), givenBreaks )
	const breakPairs = zip( breaks, [ ...breaks.slice( 1 ), getLength( text ) ] )
		.filter( ( [p1, p2] ) => p1 !== p2 )

	console.log( breakPairs )

	return breakPairs
		.map( ( [p1, p2] ) => [ slice( text, p1, p2 ), [ p1, p2 ] ] )
}

export default React.createClass( {
	propTypes: {
		content: PropTypes.string,
		lengthMethod: PropTypes.func,
		pairs: PropTypes.array,
		sliceMethod: PropTypes.func
	},

	getContent() {
		const { content, lengthMethod, pairs, sliceMethod } = this.props
		const combinePairs = (l, p) => [ ...l, ...p ]

		if ( ! pairs.length ) {
			return transform( content )
		}

		const breaks = pairs
			.reduce( combinePairs, [] )
			.sort( ( a, b ) => a - b )

		const chunks = breakAt( content, lengthMethod, sliceMethod, breaks )
			.map( ( [ text, [ pa, ] ] ) =>
				 pairs.some( ( [ p1, ] ) => p1 === pa )
					? `<span class="match">${ text }</span>`
					: text
			)

		return transform( chunks.join( '' ) )
	},

	render() {
		const { content: rawContent, lengthMethod } = this.props
		const contentLength = lengthMethod( rawContent )
		const content = this.getContent()

		return (
			<div className="text-display">
				<div dangerouslySetInnerHTML={ { __html: content } } />
				<div>Length: { contentLength }</div>
			</div>
		);
	}
} )