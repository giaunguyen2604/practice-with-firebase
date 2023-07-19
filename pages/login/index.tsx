/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useState } from 'react';
import Form, { Field } from 'rc-field-form';
import Input from '@/components/input';
import { firebaseLoginUser } from '@/utils';
import { useRouter } from 'next/router';

interface LoginPayload {
	email: string;
	password: string;
}

const Login = () => {
	const router = useRouter();
	const [isSubmitting, setSubmitting] = useState(false);

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
							Login
						</h1>
						<Form
							className='space-y-4 md:space-y-6'
							onFinish={async ({ email, password }: LoginPayload) => {
								console.log({ email, password });
								setSubmitting(true);
								await firebaseLoginUser(email, password, router);
								setSubmitting(false);
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

							<button
								disabled={isSubmitting}
								type='submit'
								className='w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
							>
								Login
							</button>
							<p className='text-sm font-light text-gray-500 dark:text-gray-400'>
								Don&apos;t have an account yet?{' '}
								<Link
									href='/signup'
									className='font-medium text-primary-600 hover:underline dark:text-primary-500'
								>
									Signup here
								</Link>
							</p>
						</Form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Login;
