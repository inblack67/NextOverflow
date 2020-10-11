import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

export const connectFB = () => {
	const firebaseConfig = {
		apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
		authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
		databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
		projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
		messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MSG_SENDER_ID,
		appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	};

	if (!firebase.apps.length) {
		firebase.initializeApp(firebaseConfig);
	}

	return firebase;
};
