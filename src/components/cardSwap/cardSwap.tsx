import fita from '@/assets/images/fita.png';

import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import CardSwaper, { Card } from '../ui/card-swap';

interface CardSwapProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function CardSwap({ ...props }: CardSwapProps) {
	return (
		<>
			<CardSwaper cardDistance={60} verticalDistance={70} delay={5000} pauseOnHover={false}>
				<Card>
					<Header />
					<div className='aspect-square w-full'>
						<Image src={fita} alt='fita cassete' className='h-full w-full object-cover' />
					</div>
				</Card>
				<Card>
					<Header />
					<div className='aspect-square w-full'>
						<Image src={fita} alt='fita cassete' className='h-full w-full object-cover' />
					</div>
				</Card>
				<Card>
					<Header />
					<div className='aspect-square w-full'>
						<Image src={fita} alt='fita cassete' className='h-full w-full object-cover' />
					</div>
				</Card>
			</CardSwaper>
		</>
	);
}

const Header = () => {
	return (
		<>
			<header className='flex gap-2 border-b-2 border-black text-black'>
				<nav>
					<button>
						<Icon icon='la:window-minimize' fontSize={30} />
					</button>
					<button>
						<Icon icon='la:window-maximize' fontSize={30} />
					</button>
					<button>
						<Icon icon='la:window-close' fontSize={30} />
					</button>
				</nav>
			</header>
		</>
	);
};
