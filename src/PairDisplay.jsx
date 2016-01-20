import React, { PropTypes } from 'react'

require( './assets/css/PairDisplay.scss' )

export default React.createClass( {
	propTypes: {
		pair: PropTypes.array.isRequired,
		onClick: PropTypes.func
	},

	sendClick() {
		const { pair, onClick } = this.props

		onClick( pair )
	},

	render() {
		const [ p1, p2 ] = this.props.pair

		return (
			<div
				className="pair-display"
				onClick={ this.sendClick }
			>
				{ `(${ p1 }, ${ p2 })` }
			</div>
		)
	}
} )