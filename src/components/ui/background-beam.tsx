'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

interface BubbleParticlesProps extends React.HTMLAttributes<HTMLDivElement> {}

export const BubbleParticles = ({ ...props }: BubbleParticlesProps) => {
	const [init, setInit] = useState(false);

	useEffect(() => {
		initParticlesEngine(async (engine) => {
			// you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
			// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
			// starting from v2 you can add only the features you need reducing the bundle size
			//await loadAll(engine);
			//await loadFull(engine);
			await loadSlim(engine);
			//await loadBasic(engine);
		}).then(() => {
			setInit(true);
		});
	}, []);

	return (
		<Particles
			id='tsparticles'
			// particlesLoaded={()=> console.log('Particles loaded')}
			className={cn('', props.className)}
			options={{
				fpsLimit: 30,
				interactivity: {
					events: {
						onClick: {
							enable: true,
							mode: 'push',
						},
						// onHover: {
						// 	enable: true,
						// 	mode: 'repulse',
						// 	parallax: {
						// 		enable: true,
						// 		force: 10,
						// 		smooth: 10,
						// 	},
						// },
						// resize: true,
					},
					modes: {
						push: {
							quantity: 2,
						},
						repulse: {
							distance: 100,
							duration: 4,
						},
					},
				},
				particles: {
					color: {
						value: '#ffffff',
					},
					links: {
						color: '#ffffff',
						distance: 100,
						enable: true,
						opacity: 0.5,
						width: 0.5,
					},
					move: {
						direction: 'top',
						enable: true,
						outModes: {
							default: 'bounce',
						},
						random: false,
						speed: 1,
						straight: false,
					},
					number: {
						density: {
							enable: true,
						},
						value: 80,
					},
					opacity: {
						value: 0.5,
					},
					shape: {
						type: 'circle',
					},
					size: {
						value: { min: 0.5, max: 1 },
					},
				},
				detectRetina: true,
			}}
		/>
	);
};
