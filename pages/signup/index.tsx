/* eslint-disable @next/next/no-img-element */
import React from 'react';
import '@/app/globals.css';
import Link from 'next/link';
import Form, { Field } from 'rc-field-form';
import Input from '@/components/input';
import { firebaseCreateUser, showError } from '@/utils';
import { useRouter } from 'next/router';

interface SignupPayload {
	email: string;
	password: string;
	confirm_password: string;
}

const Signup = () => {
	const router = useRouter();

	return (
		<section className='bg-gray-50 dark:bg-gray-900'>
			<div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
				<a
					href='#'
					className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
				>
					TICKET EVENTS
				</a>
				<div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
					<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
						<h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
							Create account
						</h1>
						<Form
							className='space-y-4 md:space-y-6'
							onFinish={({
								email,
								password,
								confirm_password,
							}: SignupPayload) => {
								if (password === confirm_password) {
									firebaseCreateUser(email, password, router);
								} else {
									showError('Password is not match');
								}
							}}
						>
							<div>
								<label
									htmlFor='email'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Your email
								</label>
								<Field name='email'>
									<Input id='email' required />
								</Field>
							</div>
							<div>
								<label
									htmlFor='password'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Password
								</label>
								<Field name='password'>
									<Input
										type='password'
										id='password'
										placeholder='••••••••'
										required
									/>
								</Field>
							</div>
							<div>
								<label
									htmlFor='confirm_password'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Confirm password
								</label>
								<Field name='confirm_password'>
									<Input
										type='password'
										id='confirm_password'
										placeholder='••••••••'
										required
									/>
								</Field>
							</div>

							<button
								type='submit'
								className='w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
							>
								Create an account
							</button>
							<p className='text-sm font-light text-gray-500 dark:text-gray-400'>
								Already have an account?{' '}
								<Link
									href='/login'
									className='font-medium text-primary-600 hover:underline dark:text-primary-500'
								>
									Login here
								</Link>
							</p>
						</Form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Signup;
