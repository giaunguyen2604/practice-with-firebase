import Nav from '@/components/common/nav';
import Events from '@/components/events';
import { useAuth } from '@/hooks/useAuth';
import { getEvents } from '@/utils';
import { DocumentData } from 'firebase/firestore';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
	const [events, setEvents] = useState<DocumentData[]>([]);
	const { user } = useAuth();

	useEffect(() => {
		if (user?.uid) getEvents(user?.uid, setEvents);
	}, [user]);

	return (
		<div>
			<Head>
				<title>Dashboard | Ticket Event</title>
				<meta
					name='description'
					content='An event ticketing system built with NextJS and Firebase'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>
				<Nav user={user} />
				{events.length > 0 ? (
					<Events events={events} />
				) : (
					<div className='w-full min-h-[90vh] flex flex-col items-center justify-center p-4'>
						<h3 className='my-4 text-center'>
							You have no existing event tickets.
						</h3>
						<Link href='events/new'>
							<button className='bg-[#FFD95A] px-6 py-4 rounded text-black'>
								Create an event ticket
							</button>
						</Link>
					</div>
				)}
			</main>
		</div>
	);
};

export default Dashboard;
