import { PROTECTED_URLS } from '@/constants';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FerrisWheelSpinnerOverlay } from 'react-spinner-overlay';

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [showChildren, setShowChildren] = useState<boolean>(false);
	const { user, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (PROTECTED_URLS.includes(router.pathname)) {
			if (user === null) {
				setShowChildren(false);
				router.push('/login');
			} else {
				setShowChildren(true);
			}
		} else setShowChildren(true);
	}, [user, router]);

	if (loading) {
		return (
			<FerrisWheelSpinnerOverlay
				overlayColor='rgba(255, 255, 255, 0.6)'
				loading={loading}
			/>
		);
	}

	return showChildren ? <>{children}</> : null;
};

export default AuthProvider;
