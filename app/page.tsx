'use client';

import Nav from '@/components/common/nav';
import { useAuth } from '@/hooks/useAuth';
import '@/app/globals.css';

export default function Home() {
	const { user } = useAuth();

	return (
		<main>
			<Nav user={user} />
			<div className='mt-5'>
				<h1 className='text-center font-bold'>TICKET EVENTS MANAGEMENT 🎉🎉</h1>
			</div>
		</main>
	);
}
