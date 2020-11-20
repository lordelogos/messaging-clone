import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyCK11znnAYMg4gpGEdrOkQHjkXNhF7x-Ss",
	authDomain: "whatsapp-clone-beb5d.firebaseapp.com",
	databaseURL: "https://whatsapp-clone-beb5d.firebaseio.com",
	projectId: "whatsapp-clone-beb5d",
	storageBucket: "whatsapp-clone-beb5d.appspot.com",
	messagingSenderId: "192437944795",
	appId: "1:192437944795:web:034e2d407628a393d367fe",
	measurementId: "G-QZWDBPRMVY",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };
