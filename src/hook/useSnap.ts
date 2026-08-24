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

			const nearestIndex = (scroll: number) => {
				let closest = 0;
				let closestDiff = Infinity;
				scrollStarts.forEach((start, i) => {
					const diff = Math.abs(start - scroll);
					if (diff < closestDiff) {
						closestDiff = diff;
						closest = i;
					}
				});
				return closest;
			};

			// Observer do wheel: cada "tique" já representa um passo de painel
			const wheelObserver = ScrollTrigger.observe({
				type: 'wheel',
				preventDefault: true,
				tolerance: 10,
				wheelSpeed: 5,
				onChangeY(self) {
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

			// Observer de touch: usa o total do gesto (swipe) em vez de cada micro-evento
			const touchObserver = ScrollTrigger.observe({
				type: 'touch',
				preventDefault: true,
				tolerance: 10,
				dragMinimum: 20,
				onDragEnd(self) {
					if (scrollTween.current) return;

					// startY - y: positivo quando o dedo arrasta para cima (equivale a "scroll para frente")
					const totalDelta = (self.startY ?? 0) - (self.y ?? 0);
					if (Math.abs(totalDelta) < 20) return;

					const direction = totalDelta > 0 ? 1 : -1;
					const current = nearestIndex(window.scrollY);
					const next = current + direction;

					goToSection(Math.max(0, Math.min(next, scrollStarts.length - 1)));
				},
			});

			ScrollTrigger.refresh();

			// Cleanup function
			return () => {
				wheelObserver.kill();
				touchObserver.kill();
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
