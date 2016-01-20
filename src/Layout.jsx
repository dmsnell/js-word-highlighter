import React from 'react'
import { flowRight, identity, negate } from 'lodash'

import PairDisplay from 'PairDisplay'
import PairEntry from 'PairEntry'
import TextDisplay from 'TextDisplay'
import TextEntry from 'TextEntry'
import TransformSelector from 'TransformSelector'

const surroundWithQuotes = text => `"${ text }"`
const textTransforms = [
	[ 'plain', 'Plain', identity ],
	[ 'json', 'JSON', JSON.parse ],
	[ 'tojson', 'JS string', flowRight( JSON.parse, surroundWithQuotes ) ]
]

const lengthMethods = [
	[ 'length', '.length', s => s.length ],
	[ 'spreadLength', '[...].length', s => [ ...s ].length ]
]

const sliceMethods = [
	[ 'string', 's.slice()', ( s, b, e ) => s.slice( b, e ) ],
	[ 'substring', 's.substring()', ( s, b, e ) => s.substring( b, e ) ],
	[ 'array', '[...s].slice()', ( s, b, e ) => [...s ].slice( b, e ).join('') ]
]

export default React.createClass( {
	getInitialState() {
		return {
			content: '',
			pairs: [],
			textTransform: identity,
			lengthMethod: lengthMethods[0][2],
			sliceMethod: sliceMethods[0][2]
		}
	},

	updateText( content ) {
		this.setState( { content } )
	},

	updateTextTransform( textTransform ) {
		this.setState( { textTransform } )
	},

	updateLengthMethod( lengthMethod ) {
		this.setState( { lengthMethod } )
	},

	updateSliceMethod( sliceMethod ) {
		this.setState( { sliceMethod } )
	},

	addPair( p1, p2 ) {
		this.setState( {
			pairs: [ ...this.state.pairs, [ p1, p2 ] ]
		} )
	},

	removePair( [ p1, p2 ] ) {
		const { pairs } = this.state
		const equalsPair = ( [ x1, x2 ] ) => p1 === x1 && p2 === x2

		this.setState( {
			pairs: pairs.filter( negate( equalsPair ) )
		} )
	},

	render() {
		const {
			content: rawContent,
			lengthMethod,
			pairs,
			sliceMethod,
			textTransform: transform
		} = this.state
		let content

		try {
			content = transform( rawContent )
		} catch (e) {
			content = 'Could not transform the given text with the selected transform'
		}

		return (
			<div>
				<TextEntry onChange={ this.updateText } />
				<TransformSelector
					title="Text Transform:"
					onChange={ this.updateTextTransform }
					optionList={ textTransforms }
				/>
				<TransformSelector
					title="Length Method:"
					onChange={ this.updateLengthMethod }
					optionList={ lengthMethods }
				/>
				<TransformSelector
					title="Slice Method:"
					onChange={ this.updateSliceMethod }
					optionList={ sliceMethods }
				/>
				<PairEntry onAdd={ this.addPair } />
				{ pairs.map( ( pair, key ) =>
					<PairDisplay
						{ ...{ pair, key } }
						onClick={ this.removePair }
					/>
				) }
				<TextDisplay { ...{ content, lengthMethod, pairs, sliceMethod } } />
			</div>
		)
	}
} )
