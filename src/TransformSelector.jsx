import React, { PropTypes } from 'react'
import { noop, partial } from 'lodash'

require( './assets/css/TransformSelector.scss' )

export default React.createClass( {
	propTypes: {
		optionList: PropTypes.array.isRequired,
		onChange: PropTypes.func,
		title: PropTypes.string.isRequired
	},

	getInitialState() {
		const { optionList } = this.props

		return { selectedValue: optionList[0][0] }
	},

	selectTransform( selectedValue ) {
		const { onChange = noop, optionList } = this.props
		const [ , , transform ] = optionList.find( ( [ v, , ] ) => v === selectedValue )

		this.setState( { selectedValue }, onChange( transform ) )
	},

	render() {
		const { optionList, title } = this.props
		const { selectedValue } = this.state

		return (
			<div className="transform-selector">
				<div>{ title }</div>
				{ optionList.map( ( [ value, label, transform ], key ) =>
					<div key={ key } onClick={ partial( this.selectTransform, value ) }>
						<input
							name={ title }
							type="radio"
							value={ value }
							checked={ selectedValue === value }
							onChange={ partial( this.selectTransform, value ) }
						/>
						{ label }
					</div>
				) }
			</div>
		)
	}
} )