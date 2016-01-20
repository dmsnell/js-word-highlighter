import React, { PropTypes } from 'react'
import { flowRight, zip } from 'lodash'

require( './assets/css/TextDisplay.scss' )

const mapNewlines = text => text.replace( /\n/g, "<br />" )
const transform = flowRight( mapNewlines )

const getLength = text => text.length

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
const breakAt = ( text, givenBreaks ) => {
	const breaks = massageBreaks( getLength( text ), givenBreaks )
	const breakPairs = zip( breaks, [ ...breaks.slice( 1 ), getLength( text ) ] )
		.filter( ( [p1, p2] ) => p1 !== p2 )

	return breakPairs
		.map( ( [p1, p2] ) => [ text.slice( p1, p2 ), [ p1, p2 ] ] )
}

export default React.createClass( {
	propTypes: {
		content: PropTypes.string,
		pairs: PropTypes.array
	},

	getContent() {
		const { content, pairs } = this.props
		const combinePairs = (l, p) => [ ...l, ...p ]

		if ( ! pairs.length ) {
			return transform( content )
		}

		const breaks = pairs
			.reduce( combinePairs, [] )
			.sort( ( a, b ) => a - b )

		const chunks = breakAt( content, breaks )
			.map( ( [ text, [ pa, ] ] ) =>
				 pairs.some( ( [ p1, ] ) => p1 === pa )
					? `<span class="match">${ text }</span>`
					: text
			)

		return transform( chunks.join( '' ) )
	},

	render() {
		const content = this.getContent()

		return (
			<div
				className="text-display"
				dangerouslySetInnerHTML={ { __html: content } }
			/>
		);
	}
} )