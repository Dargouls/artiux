'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefObject, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const useSnap = (containerRef: RefObject<HTMLElement>) => {
	const scrollTween = useRef<gsap.core.Tween | null>(null);
	const snapTriggers = useRef<ScrollTrigger[]>([]);
	const completed = true;

	// Define goToSection before useGSAP
	const goToSection = (i: number) => {
		if (!snapTriggers.current[i]) return;

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
			if (!completed || !containerRef.current) return;

			let panels = gsap.utils.toArray('.panel'),
				scrollStarts = [0],
				snapScroll = (value: number) => value;

			// Limpar triggers anteriores
			snapTriggers.current.forEach((trigger) => trigger.kill());
			snapTriggers.current = [];

			// create a ScrollTrigger for each panel
			panels.forEach((panel, i) => {
				snapTriggers.current[i] = ScrollTrigger.create({
					trigger: panel as HTMLElement,
					start: 'top top',
				});
			});

			// once all the triggers have calculated their start/end, create the snap function
			ScrollTrigger.addEventListener('refresh', () => {
				scrollStarts = snapTriggers.current.map((trigger) => trigger.start);
				snapScroll = ScrollTrigger.snapDirectional(scrollStarts);
			});

			// Criar observer para controlar o scroll
			const observer = ScrollTrigger.observe({
				type: 'wheel,touch',
				preventDefault: true,
				tolerance: 10,
				wheelSpeed: 5,
				onChangeY(self) {
					// Prevenir o scroll padrão para evitar conflitos
					if (self.event) {
						self.event.preventDefault();
						self.event.stopPropagation();
					}

					if (!scrollTween.current) {
						let currentScroll = self.scrollY() + self.deltaY;
						let direction = self.deltaY > 0 ? 1 : -1;
						let scroll = (snapScroll as any)(currentScroll, direction);
						goToSection(scrollStarts.indexOf(scroll));
					}
				},
			});

			ScrollTrigger.refresh();

			// Cleanup function
			return () => {
				observer.kill();
				snapTriggers.current.forEach((trigger) => trigger.kill());
				ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
			};
		},
		{
			dependencies: [completed],
			scope: containerRef,
			revertOnUpdate: true,
		}
	);

	return { goToSection };
};

export default useSnap;
