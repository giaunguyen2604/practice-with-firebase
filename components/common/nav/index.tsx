import { firebaseLogOut } from '@/utils';
import { User } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

interface NavProps {
	user: User | null;
}

const Nav: React.FC<NavProps> = ({ user }) => {
	const router = useRouter();

	const handleLogout = () => {
		firebaseLogOut(router);
	};

	return (
		<div className='flex justify-between items-center px-3 py-2 shadow-sm'>
			<h3>TICKET EVENTS</h3>
			{user ? (
				<div className='flex gap-3'>
					<Link href='#'>{user.email}</Link>
					<Link href='#' onClick={handleLogout}>
						Logout
					</Link>
				</div>
			) : (
				<div className='flex gap-3'>
					<Link href='/signup'>Signup</Link>
					<Link href='/login'>Login</Link>
				</div>
			)}
		</div>
	);
};

export default Nav;
