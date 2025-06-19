'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefObject } from 'react';

gsap.registerPlugin(ScrollTrigger);

const useScrollSmoother = (sectionRef: RefObject<HTMLElement>, cardRef: RefObject<HTMLElement>) => {
	useGSAP(
		() => {
			if (!sectionRef.current || !cardRef.current) return;

			// Mover o card suavemente
			gsap.to(cardRef.current, {
				y: -500, // quanto o card sobe
				ease: 'bounce.out',
				scrollTrigger: {
					trigger: sectionRef.current,
					start: 'bottom bottom',
					end: '+=300',
					scrub: true,
				},
			});
		},
		{ scope: sectionRef }
	);
};

export default useScrollSmoother;
