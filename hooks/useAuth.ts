import { auth } from '@/firebase';
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';

export const useAuth = () => {
	const [user, setUser] = useState<User | null>();
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setLoading(true);
		auth.onAuthStateChanged(function handleAuth(user) {
			setUser(user);
			setLoading(false);
		});
	}, [user]);

	return { user, loading };
};
