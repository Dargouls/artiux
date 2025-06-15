'use client';

import ret from '@/assets/brand/retangle.svg';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRef } from 'react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Layers() {
	const main = useRef(null);
	const completed = true;
	const scrollTween = useRef<gsap.core.Tween | null>(null);
	const snapTriggers = useRef<ScrollTrigger[]>([]);

	// Define goToSection before useGSAP
	const goToSection = (i: any) => {
		// Alternative 1: Using GSAP ScrollToPlugin (recommended)
		scrollTween.current = gsap.to(window, {
			scrollTo: snapTriggers.current[i].start,
			duration: 1,
			ease: 'power2.inOut',
			onComplete: () => (scrollTween.current = null),
			overwrite: true,
		});
	};

	useGSAP(
		() => {
			if (!completed) return;

			let panels = gsap.utils.toArray('.panel'),
				scrollStarts = [0],
				snapScroll = (value: number) => value; // for converting a pixel-based scroll value to the closest panel scroll position

			// create a ScrollTrigger for each panel that's only concerned about figuring out when its top hits the top of the viewport
			panels.forEach((panel, i) => {
				snapTriggers.current[i] = ScrollTrigger.create({
					trigger: panel as any,
					start: 'top top',
				});
			});

			// once all the triggers have calculated their start/end, create the snap function
			ScrollTrigger.addEventListener('refresh', () => {
				scrollStarts = snapTriggers.current.map((trigger) => trigger.start);
				snapScroll = ScrollTrigger.snapDirectional(scrollStarts);
			});

			ScrollTrigger.observe({
				type: 'wheel,touch',
				onChangeY(self) {
					if (!scrollTween.current) {
						// find the closest snapping spot based on the direction of scroll
						let currentScroll = self.scrollY() + self.deltaY;
						let direction = self.deltaY > 0 ? 1 : -1;
						let scroll = (snapScroll as any)(currentScroll, direction);
						goToSection(scrollStarts.indexOf(scroll)); // scroll to the index of the associated panel
					}
				},
			});

			ScrollTrigger.refresh();
		},
		{
			dependencies: [completed],
			scope: main,
			revertOnUpdate: true,
		}
	);

	return (
		<main ref={main}>
			<section className='description panel light sticky top-0 h-screen'>
				<div>
					<h1>Layered pinning</h1>
					<p>Use pinning to layer panels on top of each other as you scroll.</p>
					<div className='scroll-down'>
						Scroll down<div className='arrow'></div>
					</div>
				</div>
			</section>
			<section className='panel h-screen bg-black'>ONE</section>
			<section className='panel h-screen bg-purple-500'>TWO</section>
			<section className='h-screen bg-gradient-to-b from-purple-500 to-red-500'>
				<div className='relative flex h-full w-full flex-col'>
					<Image src={ret} alt='logo' height={50} className='w-full' />
					<div className='flex-1 bg-white' />

					<Image src={ret} alt='logo' height={50} className='w-full -translate-y-1 -rotate-180' />
				</div>
			</section>
			<section className='panel sticky top-0 h-screen bg-red-500'>FOUR</section>
		</main>
	);
}
