import handleObject from './handle-object';

const getItemValue = ( schema, value, definitions ) => {
	switch ( schema.type ) {
		case 'boolean':
			return value || schema.default || false;
		case 'number':
			return value || schema.default || 0;
		case 'string':
		case 'textarea':
			return value || schema.default || '';
		case 'array':
			return value || schema.default || [];
		case 'object':
			return handleObject( schema, value, definitions );
		default:
			return null;
	}
};

export default ( schema, values ) => {
	const formValues = {};
	Object.keys( schema.properties ).forEach( ( key ) => {
		formValues[ key ] = getItemValue( schema.properties[ key ], values[ key ], schema.definitions );
	} );

	return {
		form: {
			isSaving: false,
			pristine: true,
			currentStep: -1,
			packages: {
				modalErrors: {},
			},
			values: formValues,
			shippingLabel: {},
		},
	};
};
