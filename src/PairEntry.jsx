import React, { PropTypes } from 'react'
import { get, partial } from 'lodash'

require( './assets/css/PairEntry.scss' )

export default React.createClass( {
	getInitialState() {
		return {
			p1: '',
			p2: ''
		}
	},

	addPoint() {
		const { onAdd } = this.props
		const { p1, p2 } = this.state
		const parseToTen = a => parseInt( a, 10 )

		onAdd( ...[ p1, p2 ].map( parseToTen ) )

		this.setState( {
			p1: '',
			p2: ''
		} )
	},

	updateValue( ref, { target: { value } } ) {
		this.setState( { [ ref ]: value } )
	},

	render() {
		const { p1, p2 } = this.state
		const isEnabled = p1.length && p2.length

		return (
			<div className="pair-entry">
				{ [ 'p1', 'p2' ].map( ( ref, key ) => (
					<input
						{ ...{ ref, key } }
						type="text"
						value={ this.state[ ref ] }
						onChange={ partial( this.updateValue, ref ) }
					/>
				) ) }
				<button disabled={ ! isEnabled } onClick={ this.addPoint }>Add Pair</button>
			</div>
		)
	}
} )