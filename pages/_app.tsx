import '@/app/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AppProps } from 'next/app';
import AuthProvider from '@/providers/AuthProvider';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<Component {...pageProps} />
			<ToastContainer />
		</AuthProvider>
	);
}
