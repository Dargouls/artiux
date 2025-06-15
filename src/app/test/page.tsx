'use client';

import CardSwap, { Card } from '@/components/ui/card-swap';
import ScrollFloat from '@/components/ui/scroll-float';

export default function Test() {
	return (
		<div className='h-[200vh] overflow-scroll'>
			<ScrollFloat
				animationDuration={1}
				ease='back.inOut(2)'
				scrollStart='center bottom+=50%'
				scrollEnd='bottom bottom-=40%'
				stagger={0.03}
			>
				HELLO WORLD
			</ScrollFloat>

			<div className='absolute h-full w-full overflow-hidden'>
				<CardSwap cardDistance={60} verticalDistance={70} delay={5000} pauseOnHover={false}>
					<Card>
						<h3 className='border-border border p-4'>Card 1</h3>
						<p className='border-border border-t p-4'>Your content here</p>
					</Card>
					{/* <Card>
					<h3>Card 2</h3>
					<p>Your content here</p>
				</Card> */}
					<Card>
						<h3>Card 3</h3>
						<p>Your content here</p>
					</Card>
				</CardSwap>
			</div>
		</div>
	);
}
