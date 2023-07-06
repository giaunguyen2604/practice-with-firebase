import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import { NextRouter, useRouter } from 'next/router';
import { auth } from '../firebase';
import { showError, showSuccess } from './toast';

export const firebaseCreateUser = (
	email: string,
	password: string,
	router: NextRouter
) => {
	createUserWithEmailAndPassword(auth, email, password)
		.then(userCredential => {
			const user = userCredential.user;
			console.log(user);
			showSuccess('Account created successfully');
			router.push('/login');
		})
		.catch(error => {
			console.error(error);
			showError('Account creation declined ❌');
		});
};

export const firebaseLoginUser = (
	email: string,
	password: string,
	router: NextRouter
) => {
	signInWithEmailAndPassword(auth, email, password)
		.then(userCredential => {
			const user = userCredential.user;
			console.log(user);
			showSuccess('Authentication successful 🎉');
			router.push('/dashboard');
		})
		.catch(error => {
			console.error(error);
			showError('Incorrect Email/Password ❌');
		});
};

export const firebaseLogOut = (router: NextRouter) => {
	signOut(auth)
		.then(() => {
			showSuccess('Logout successful! 🎉');
			router.push('/');
		})
		.catch(error => {
			showError("Couldn't sign out ❌");
		});
};
