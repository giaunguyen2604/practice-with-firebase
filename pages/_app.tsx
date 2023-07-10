import '@/app/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<div>
			<Component {...pageProps} />
			<ToastContainer />
		</div>
	);
}
