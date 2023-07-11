import db from '@/firebase';
import { DocumentData, doc, getDoc } from 'firebase/firestore';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiTwotoneHome } from 'react-icons/ai';

export async function getServerSideProps(context: any) {
	const docRef = doc(db, 'events', context.query.id);
	const docSnap = await getDoc(docRef);

	let firebaseEvent = {};
	if (docSnap.exists()) {
		firebaseEvent = docSnap.data();
	} else {
		console.log('No such document!');
	}
	console.log(firebaseEvent);
	return {
		props: { firebaseEvent },
	};
}

interface EventDetailProps {
	firebaseEvent: DocumentData;
}
const EventDetail: React.FC<EventDetailProps> = ({ firebaseEvent }) => {
	const router = useRouter();
	console.log(router);
	if (!firebaseEvent.title) return <></>;
	return (
		<div>
			<Head>
				<title>{`${firebaseEvent.title} | EventTiz`}</title>
				<meta
					name='description'
					content='An event ticketing system built with NextJS and Firebase'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className='relative w-full'>
				<div className='h-[45vh] p-3 flex flex-col items-center justify-center bg-[#FFD95A]  registergray w-full'>
					<h2 className='text-4xl font-extrabold mb-4 text-center text-white'>
						{firebaseEvent.title}
					</h2>
					<h4 className='font-extrabold mb-4 text-center text-white'>
						{firebaseEvent.time}
					</h4>
				</div>

				<Link href='/dashboard' className='absolute top-6 left-4 py-2 px-4'>
					<AiTwotoneHome className='text-4xl text-[#FFD95A]' />
				</Link>
			</main>
		</div>
	);
};

export default EventDetail;
