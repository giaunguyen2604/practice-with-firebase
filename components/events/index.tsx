import { deleteEvent } from '@/utils';
import { DocumentData } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { MdDelete } from 'react-icons/md';

interface EventsProps {
	events: DocumentData[];
}

const Events: React.FC<EventsProps> = ({ events }) => {
	const router = useRouter();

	const handleRoute = (slug: string, id: string) =>
		router.push({ pathname: `/events/${id}/${slug}` });

	return (
		<div className='w-full flex flex-col items-center py-[60px] px-[20px]'>
			<Link href='/events/new'>
				<button className='bg-[#FFD95A] border-[1px] px-6 py-4 rounded-lg mb-4 text-black'>
					Create an event ticket
				</button>
			</Link>

			<div className='w-full flex flex-wrap items-center justify-center'>
				{events.map(event => (
					<div
						className='md:w-[450px] w-full hover:shadow border-[1px] rounded-2xl m-3'
						key={event.id}
					>
						<div
							className='p-4 w-full cursor-pointer'
							onClick={() => handleRoute(event.data.slug, event.id)}
						>
							<h2 className='text-xl font-medium mb-6'>{event.data.title}</h2>
							<p className='opacity-80'>
								{event.data.attendees.length > 0
									? `${event.data.attendees.length} people registered`
									: `No attendee yet`}
							</p>
							<p className='opacity-50'>Time: {event.data.time}</p>
							<p className='opacity-50'>Date: {event.data.date}</p>
						</div>

						<div className='w-full py-6 bg-[#C07F00] rounded-b-2xl flex items-center px-4 justify-between'>
							<MdDelete
								className='text-gray-200 text-2xl cursor-pointer'
								onClick={() => deleteEvent(event.id)}
							/>
							{/* {!event.data.disableRegistration && (
            <BsFillShareFill
              className='text-white text-xl cursor-pointer'
              onClick={openModal}
            />
          )} */}
						</div>
						{/* {showModal && (
          <ShareEventModal event={event} closeModal={closeModal} />
        )} */}
					</div>
				))}
			</div>
		</div>
	);
};

export default Events;
