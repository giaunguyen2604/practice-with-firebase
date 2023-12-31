import { toast } from 'react-toastify';

export const showSuccess = (text: string) => {
	toast(text, { type: 'success', autoClose: 1000 });
};

export const showError = (text: string) => {
	toast(text, { type: 'error' });
};
