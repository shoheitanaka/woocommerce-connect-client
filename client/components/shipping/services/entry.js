import React, { PropTypes } from 'react';
import FormCheckbox from 'components/forms/form-checkbox';
import FormSelect from 'components/forms/form-select';
import Gridicon from 'components/gridicon';
import classNames from 'classnames';
import NumberInput from 'components/number-field/number-input';

const ShippingServiceEntry = ( props ) => {
	const {
		currencySymbol,
		updateValue,
		errors,
		service,
	} = props;

	const {
		enabled,
		name,
		adjustment,
		adjustment_type,
	} = service;

	const hasError = errors[ service.id ];

	return (
		<div className={ classNames( 'wcc-shipping-service-entry', { 'wcc-error': hasError } ) }>
			<label className="wcc-shipping-service-entry-title">
				<FormCheckbox
					checked={ enabled }
					onChange={ ( event ) => updateValue( 'enabled', event.target.checked ) }
				/>
				{ name }
			</label>
			{ hasError ? <Gridicon icon="notice" /> : null }
			<NumberInput
				disabled={ ! enabled }
				value={ adjustment }
				onChange={ ( event ) => updateValue( 'adjustment', event.target.value ) }
				isError={ hasError }
			/>
			<FormSelect
				disabled={ ! enabled }
				value={ adjustment_type }
				onChange={ ( event ) => updateValue( 'adjustment_type', event.target.value ) }
			>
				<option value="flat">{ currencySymbol }</option>
				<option value="percentage">%</option>
			</FormSelect>
		</div>
	);
};

ShippingServiceEntry.propTypes = {
	service: PropTypes.shape( {
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		enabled: PropTypes.bool,
		adjustment: PropTypes.oneOfType( [
			PropTypes.string,
			PropTypes.number,
		] ),
		adjustment_type: PropTypes.string,
	} ),
	currencySymbol: PropTypes.string.isRequired,
	updateValue: PropTypes.func.isRequired,
	settingsKey: PropTypes.string.isRequired,
};

ShippingServiceEntry.defaultProps = {
	enabled: false,
	adjustment: 0,
	adjustment_type: 'flat',
};

export default ShippingServiceEntry;
