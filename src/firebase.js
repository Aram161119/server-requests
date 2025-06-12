import { initializeApp } from 'firebase/app';
import { collection, getFirestore, getDocs, doc } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyB_7dl-ec8FxbiNHSj2ZjtQlOyIuOLcB6M',
	authDomain: 'todos-d355a.firebaseapp.com',
	projectId: 'todos-d355a',
	storageBucket: 'todos-d355a.firebasestorage.app',
	messagingSenderId: '755039422960',
	appId: '1:755039422960:web:a604603262259413bfb535',
	measurementId: 'G-YY9SHCSM66',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const todosRef = collection(db, 'todos');

const querySnapshot = async (ref) => await getDocs(ref);

const todoRef = (id) => doc(todosRef, id);

export { db, todoRef, todosRef, querySnapshot };
