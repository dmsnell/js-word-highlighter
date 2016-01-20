import React, { PropTypes } from 'react'
import ContentEditable from 'react-contenteditable'

const defaultText = 'Paste or type your content here…'

require( './assets/css/TextEntry.scss' )

export default React.createClass( {
	propTypes: {
		onChange: PropTypes.func
	},

	updateText( { target: { value } } ) {
		this.props.onChange( value )
	},

	render() {
		return (
			<textarea
				className="text-entry"
				placeholder={ defaultText }
				onChange={ this.updateText }
			/>
		)
	}
} )
