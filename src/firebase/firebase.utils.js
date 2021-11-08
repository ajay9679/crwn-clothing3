import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAxkGAHlN7Yi42OC4IppopNdW1Kh_zv4l0",
  authDomain: "crwn-db2-3a571.firebaseapp.com",
  projectId: "crwn-db2-3a571",
  storageBucket: "crwn-db2-3a571.appspot.com",
  messagingSenderId: "949593841863",
  appId: "1:949593841863:web:cdf1d354998be679089ee2",
  measurementId: "G-EV5D2TX3L8"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if(!userAuth) return;
	const userRef = firestore.doc(`users/${userAuth.uid}`);
	const snapShot = await userRef.get();
	if(!snapShot.exists){
		const {displayName, email} = userAuth;
		const createdAt = new Date();
		try{
			await userRef.set({displayName, email, createdAt, ...additionalData});
		}catch(err){
			console.error('error creating user: ', err.message);
		}
	}

	return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = firestore.collection(collectionKey);
	const batch = firestore.batch();
	objectsToAdd.forEach(obj => {
		const newDocRef = collectionRef.doc();
		batch.set(newDocRef, obj);
	});
	await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
	const transformedCollection = collections.docs.map(doc => {
		const {title, items} = doc.data();
		return {
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items,
		};
	});
	console.log(transformedCollection)
	return transformedCollection.reduce((acc, collection) => {
		acc[collection.title.toLowerCase()] = collection;
		return acc;
	}, {})
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
