import React from 'react'
import { negate } from 'lodash'

import PairDisplay from 'PairDisplay'
import PairEntry from 'PairEntry'
import TextDisplay from 'TextDisplay'
import TextEntry from 'TextEntry'

export default React.createClass( {
	getInitialState() {
		return {
			content: '',
			pairs: []
		}
	},

	updateText( content ) { this.setState( { content } ) },

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
		const { content, pairs } = this.state

		return (
			<div>
				<TextEntry onChange={ this.updateText } />
				<PairEntry onAdd={ this.addPair } />
				{ pairs.map( ( pair, key ) =>
					<PairDisplay
						{ ...{ pair, key } }
						onClick={ this.removePair }
					/>
				) }
				<TextDisplay { ...{ content, pairs } } />
			</div>
		)
	}
} )
