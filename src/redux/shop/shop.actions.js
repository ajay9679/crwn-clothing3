import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils.js';


import ShopActionTypes from './shop.types.js';

export const updateCollections = collectionsMap => ({
	type: ShopActionTypes.UPDATE_COLLECTIONS,
	payload: collectionsMap,
});

export const fetchCollectionsStart = () => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = collectionsMap => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
	payload: collectionsMap,
});

export const fetchCollectionsFailure = error => ({
	type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
	payload: error,
});

export const fetchCollectionsStartAsync = () => {
	return dispatch => {
		const collectionRef = firestore.collection('collections');
		dispatch(fetchCollectionsStart());
		collectionRef.get().then(async snapShot => {
			const collectionsMap = convertCollectionsSnapshotToMap(snapShot)
			// this.props.updateCollections(collectionsMap);
			dispatch(fetchCollectionsSuccess(collectionsMap));
		}).catch(err => dispatch(fetchCollectionsFailure(err.message)));
	};
};
