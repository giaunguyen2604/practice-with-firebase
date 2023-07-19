import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import { NextRouter, useRouter } from 'next/router';
import db, { auth, storage } from '../firebase';
import { showError, showSuccess } from './toast';
import {
	collection,
	doc,
	onSnapshot,
	query,
	where,
	DocumentData,
} from '@firebase/firestore';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import {
	addDoc,
	arrayUnion,
	deleteDoc,
	getDoc,
	updateDoc,
} from 'firebase/firestore';
import { deleteObject } from 'firebase/storage';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

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

export const firebaseLoginUser = async (
	email: string,
	password: string,
	router: NextRouter
) => {
	try {
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;
		console.log(user);
		showSuccess('Authentication successful 🎉');
		router.push('/dashboard');
	} catch (error) {
		console.error(error);
		showError('Incorrect Email/Password ❌');
	}
};

export const firebaseLogOut = (router: AppRouterInstance) => {
	signOut(auth)
		.then(() => {
			showSuccess('Logout successful! 🎉');
			router.push('/');
		})
		.catch(error => {
			showError("Couldn't sign out ❌");
		});
};

export const createSlug = (sentence: string) => {
	let slug = sentence.toLowerCase().trim();
	slug = slug.replace(/[^a-z0-9]+/g, '-');
	slug = slug.replace(/^-+|-+$/g, '');
	return slug;
};

export const addEventToFirebase = async (
	id: string,
	title: string,
	date: string,
	time: string,
	description: string,
	flier: string,
	router: NextRouter
) => {
	const docRef = await addDoc(collection(db, 'events'), {
		user_id: id,
		title,
		date,
		time,
		description,
		slug: createSlug(title),
		attendees: [],
		disableRegistration: false,
	});

	const imageRef = ref(storage, `events/${docRef.id}/image`);
	console.log({ imageRef });
	console.log(flier);
	if (flier !== null) {
		await uploadString(imageRef, flier, 'data_url').then(async () => {
			const downloadURL = await getDownloadURL(imageRef);
			await updateDoc(doc(db, 'events', docRef.id), {
				flier_url: downloadURL,
			});

			showSuccess('Event created! 🎉');
			router.push('/dashboard');
		});
	} else {
		showError('Event created! 🎉');
		router.push('/dashboard');
	}
};

export const getEvents = (
	id: string,
	setEvents: React.Dispatch<React.SetStateAction<DocumentData[]>>
) => {
	try {
		const q = query(collection(db, 'events'), where('user_id', '==', id));

		const unsubscribe = onSnapshot(q, querySnapshot => {
			const firebaseEvents: { data: DocumentData; id: string }[] = [];
			querySnapshot.forEach(doc => {
				firebaseEvents.push({ data: doc.data(), id: doc.id });
			});
			setEvents(firebaseEvents);

			return () => unsubscribe();
		});
	} catch (error) {
		console.error(error);
	}
};

export const deleteEvent = async (id: string) => {
	await deleteDoc(doc(db, 'events', id));

	const imageRef = ref(storage, `events/${id}/image`);
	deleteObject(imageRef)
		.then(() => {
			showSuccess('Deleted successfully');
		})
		.catch(error => {
			showError('Image does not exist');
		});
};

//👇🏻 generates a unique passcode for the attendee
export const generatePasscode = () =>
	Math.random().toString(36).substring(2, 10);

export const registerAttendee = async (
	name: string,
	email: string,
	event_id: string
) => {
	const passcode = generatePasscode();
	const eventRef = doc(db, 'events', event_id);
	const eventSnap = await getDoc(eventRef);
	let firebaseEvent: DocumentData = {};
	if (eventSnap.exists()) {
		firebaseEvent = eventSnap.data();
		//👇🏻 gets the attendees' list
		const attendees = firebaseEvent.attendees;
		//👇🏻 filter the list
		const result = attendees.filter((item: any) => item.email === email);
		//👇🏻 if registration is valid
		if (result.length === 0 && firebaseEvent.disableRegistration === false) {
			//👇🏻 adds the attendee to the list
			await updateDoc(eventRef, {
				attendees: arrayUnion({
					name,
					email,
					passcode,
				}),
			});
			// 👉🏻 sendEventTicketViaEmail()
			showSuccess('User registered successfully! ✅');
		} else {
			showError('User already registered ❌');
		}
	}
};
