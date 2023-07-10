import Input from '@/components/input';
import Form, { Field } from 'rc-field-form';
import React, { useState } from 'react';
import '@/app/globals.css';
import { DocumentData } from 'firebase/firestore';
import { addEventToFirebase } from '@/utils';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';

interface CreateEventPayload {
	id: string;
	title: string;
	date: string;
	time: string;
	description: string;
	flier: string;
}

const CreateEvent = () => {
	const [flier, setFlier] = useState<any>();
	const [events, setEvents] = useState<DocumentData>();
	const { user } = useAuth();
	const router = useRouter();

	const handleFileReader = (e: any) => {
		const reader = new FileReader();
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		}
		reader.onload = readerEvent => {
			setFlier(readerEvent.target?.result);
		};
	};

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
							Create new event
						</h1>
						<Form
							className='space-y-4 md:space-y-6'
							onFinish={({
								title,
								date,
								time,
								description,
							}: CreateEventPayload) => {
								addEventToFirebase(
									user?.uid || '',
									title,
									date,
									time,
									description,
									flier,
									router
								);
							}}
						>
							<div>
								<label
									htmlFor='title'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Title*
								</label>
								<Field name='title'>
									<Input id='title' required />
								</Field>
							</div>
							<div>
								<label
									htmlFor='date'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Date*
								</label>
								<Field name='date'>
									<Input id='date' required type='date' />
								</Field>
							</div>
							<div>
								<label
									htmlFor='time'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Time*
								</label>
								<Field name='time'>
									<Input type='time' id='time' required />
								</Field>
							</div>

							<div>
								<label
									htmlFor='description'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Description
								</label>
								<Field name='description'>
									<Input id='description' />
								</Field>
							</div>

							<div>
								<label
									htmlFor='flier'
									className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
								>
									Event Flier
								</label>
								<Field name='flier'>
									<Input id='flier' type='file' onChange={handleFileReader} />
								</Field>
							</div>

							<button
								type='submit'
								className='w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
							>
								Create
							</button>
						</Form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CreateEvent;
