/*global wcConnectData */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import configureStore from 'state';
import '../assets/stylesheets/style.scss';
import initializeState from './lib/initialize-state';
import './lib/calypso-boot';
import { translate as __ } from 'lib/mixins/i18n';

const {
	formData,
	formSchema,
	formLayout,
	storeOptions,
	callbackURL,
	nonce,
	submitMethod,
	rootView,
} = wcConnectData;

const thunkArgs = { callbackURL, nonce, submitMethod, formSchema, formLayout };
const store = configureStore( initializeState( formSchema, formData ), thunk.withExtraArgument( thunkArgs ) );

window.addEventListener( 'beforeunload', ( event ) => {
	if ( store.getState().form.pristine ) {
		return;
	}
	const text = __( 'You have unsaved changes.' );
	( event || window.event ).returnValue = text;
	return text;
} );

const rootEl = document.getElementById( 'wc-connect-admin-container' );

let render = () => {
	const RootView = 'shipping-label' === rootView ? require( 'views/shipping-label' ) : require( 'views/shipping' );
	ReactDOM.render(
		<Provider store={ store }>
			<RootView
				storeOptions={ storeOptions }
				schema={ formSchema }
				layout={ formLayout }
			/>
		</Provider>,
		rootEl
	);
};

if ( module.hot ) {
	// Support hot reloading of components
	// and display an overlay for runtime errors
	const renderApp = render;
	const renderError = ( error ) => {
		const RedBox = require( 'redbox-react' );
		ReactDOM.render(
			<RedBox error={ error } />,
			rootEl
		);
	};

	render = () => {
		try {
			renderApp();
		} catch ( error ) {
			renderError( error );
		}
	};

	module.hot.accept( [ 'views/shipping', 'views/shipping-label' ], () => {
		setTimeout( render );
	} );
}

render();
