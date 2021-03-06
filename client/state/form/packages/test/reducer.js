import reducer from '../reducer';
import {
	addPackage,
	editPackage,
	dismissModal,
	setSelectedPreset,
	updatePackagesField,
	toggleOuterDimensions,
	savePackage,
	setModalErrors,
} from '../actions';

const initialState = {
	showModal: false,
	packageData: null,
};

describe( 'Packages form reducer', () => {
	afterEach( () => {
		// make sure the state hasn't been mutated
		// after each test
		expect( initialState ).to.eql( {
			showModal: false,
			packageData: null,
		} );
	} );

	it( 'ADD_PACKAGE preserves form data', () => {
		const existingAddState = {
			showModal: false,
			mode: 'add',
			packageData: {
				name: 'Package name here',
			},
		};
		const action = addPackage();
		const state = reducer( existingAddState, action );

		expect( state ).to.eql( {
			showModal: true,
			mode: 'add',
			packageData: existingAddState.packageData,
		} );
	} );

	it( "ADD_PACKAGE clears previous 'edit' data", () => {
		const existingEditState = {
			showModal: false,
			mode: 'edit',
			packageData: {
				index: 1,
				name: 'Package name here',
			},
		};
		const action = addPackage();
		const state = reducer( existingEditState, action );

		expect( state ).to.eql( {
			showModal: true,
			mode: 'add',
			packageData: { is_user_defined: true },
		} );
	} );

	it( 'EDIT_PACKAGE', () => {
		const packageData = {
			index: 1,
			name: 'Test Box',
		};
		const initialStateVisibleOuterDimensions = Object.assign( {}, initialState, {
			showOuterDimensions: true,
		} );
		const action = editPackage( packageData );
		const state = reducer( initialStateVisibleOuterDimensions, action );

		expect( state ).to.eql( {
			showModal: true,
			modalReadOnly: false,
			mode: 'edit',
			packageData,
			showOuterDimensions: false,
		} );
	} );

	it( 'DISMISS_MODAL', () => {
		const visibleModalState = {
			showModal: true,
		};
		const action = dismissModal();
		const state = reducer( visibleModalState, action );

		expect( state ).to.eql( {
			modalErrors: {},
			showModal: false,
		} );
	} );

	it( 'SET_SELECTED_PRESET', () => {
		let state = {};

		state = reducer( state, setSelectedPreset( 'a' ) );
		expect( state ).to.eql( {
			selectedPreset: 'a',
		} );

		state = reducer( state, setSelectedPreset( 'aaa' ) );
		expect( state ).to.eql( {
			selectedPreset: 'aaa',
		} );

		state = reducer( state, setSelectedPreset( '1112' ) );
		expect( state ).to.eql( {
			selectedPreset: '1112',
		} );
	} );

	it( 'UPDATE_PACKAGES_FIELD', () => {
		const packageData = {
			name: 'Test Box',
			is_letter: false,
			index: 1,
		};
		const action = updatePackagesField( {
			name: 'Box Test',
			max_weight: '300',
			index: null,
		} );
		const state = reducer( { packageData }, action );

		expect( state ).to.eql( {
			packageData: {
				name: 'Box Test',
				max_weight: '300',
				is_letter: false,
			},
		} );
	} );

	it( 'TOGGLE_OUTER_DIMENSIONS', () => {
		const visibleModalState = {
			showModal: true,
		}
		const action = toggleOuterDimensions();
		const state = reducer( visibleModalState, action );

		expect( state ).to.eql( {
			showModal: true,
			showOuterDimensions: true,
		} );
	} );

	it( 'SAVE_PACKAGE', () => {
		const packageData = {
			is_user_defined: true,
			index: 1,
			name: 'Test Box',
		};
		const initialSavePackageState = {
			showModal: true,
			mode: 'edit',
			packageData,
			showOuterDimensions: false,
		};
		const action = savePackage( 'boxes', packageData );
		const state = reducer( initialSavePackageState, action );

		expect( state ).to.eql( {
			showModal: false,
			mode: 'add',
			packageData: {
				is_user_defined: true,
			},
			showOuterDimensions: false,
			selectedPreset: null,
		} );
	} );

	it( 'SET_MODAL_ERROR', () => {
		const initialSavePackageState = {
			showModal: true,
			mode: 'edit',
			showOuterDimensions: false,
		};
		const action = setModalErrors( true );

		const state = reducer( initialSavePackageState, action );
		expect( state ).to.eql( {
			showModal: true,
			mode: 'edit',
			showOuterDimensions: false,
			modalErrors: true,
		} );

		const newState = reducer( initialSavePackageState, setModalErrors( { any: true } ) );
		expect( newState ).to.eql( {
			showModal: true,
			mode: 'edit',
			showOuterDimensions: false,
			modalErrors: { any: true },
		} );
	} );
} );
