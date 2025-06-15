'use client';

import { useEffect, useRef, useState } from 'react';

import first from '@/assets/images/first.png';
import second from '@/assets/images/second.png';

import NoiseSurface from '@/components/meta-noise';
import { BubbleParticles } from '@/components/ui/background-beam';
import { Compare } from '@/components/ui/compare';
import Lenis from 'lenis';

export default function SnapOld() {
	const [peaks, setPeaks] = useState(0.3);

	const lenisRef = useRef<Lenis | null>(null);
	const isScrolling = useRef(false);
	const totalSections = 4;
	const wheelAccumulator = useRef(0);
	const lastWheelTime = useRef(0);
	const wheelTimeout = useRef<NodeJS.Timeout | null>(null);

	// Sempre calcula a seção atual baseada na posição real do scroll
	const getCurrentSectionIndex = (): number => {
		const scrollY = window.scrollY;
		const sectionHeight = window.innerHeight;
		return Math.round(scrollY / sectionHeight);
	};

	// Calcula a seção mais próxima baseada na posição atual
	const getNearestSectionIndex = (): number => {
		const scrollY = window.scrollY;
		const sectionHeight = window.innerHeight;
		const rawIndex = scrollY / sectionHeight;
		return Math.max(0, Math.min(Math.round(rawIndex), totalSections - 1));
	};

	// Verifica se está numa posição válida de seção
	const isAtValidSectionPosition = (): boolean => {
		const scrollY = window.scrollY;
		const sectionHeight = window.innerHeight;
		const nearestSectionY = Math.round(scrollY / sectionHeight) * sectionHeight;
		return Math.abs(scrollY - nearestSectionY) < 10;
	};

	// Faz snap para a seção mais próxima
	const snapToNearestSection = () => {
		if (isScrolling.current || !lenisRef.current) return;

		const nearestIndex = getNearestSectionIndex();
		const targetScroll = window.innerHeight * nearestIndex;
		const currentScroll = window.scrollY;

		// Só faz snap se não estiver na posição correta
		if (Math.abs(currentScroll - targetScroll) > 10) {
			isScrolling.current = true;
			lenisRef.current.scrollTo(targetScroll, {
				immediate: false,
				duration: 0.8,
			});

			setTimeout(() => {
				isScrolling.current = false;
			}, 100);
		}
	};

	useEffect(() => {
		const lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
		});
		lenisRef.current = lenis;

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);

		const handleWheel = (e: WheelEvent) => {
			e.preventDefault();

			const now = Date.now();
			const timeDelta = now - lastWheelTime.current;
			lastWheelTime.current = now;

			// Se estiver animando, bloqueia novos scrolls
			if (isScrolling.current) return;

			// Limpa timeout anterior
			if (wheelTimeout.current) {
				clearTimeout(wheelTimeout.current);
				wheelTimeout.current = null;
			}

			// Acumula o movimento do wheel se for rápido
			if (timeDelta < 200) {
				wheelAccumulator.current += e.deltaY;
			} else {
				wheelAccumulator.current = e.deltaY;
			}

			// Determina direção baseada no acumulador
			const direction = wheelAccumulator.current > 0 ? 1 : -1;

			// Calcula posição atual
			const currentScrollY = window.scrollY;
			const sectionHeight = window.innerHeight;
			const currentSectionFloat = currentScrollY / sectionHeight;
			const currentSectionIndex = Math.round(currentSectionFloat);

			// Se já estiver numa posição válida de seção
			if (Math.abs(currentScrollY - currentSectionIndex * sectionHeight) < 50) {
				// Vai para próxima seção na direção do scroll
				let targetIndex: number;
				if (direction > 0) {
					targetIndex = Math.min(currentSectionIndex + 1, totalSections - 1);
				} else {
					targetIndex = Math.max(currentSectionIndex - 1, 0);
				}

				const targetScroll = sectionHeight * targetIndex;

				// Só anima se mudou de seção
				if (targetIndex !== currentSectionIndex) {
					isScrolling.current = true;
					wheelAccumulator.current = 0;

					lenis.scrollTo(targetScroll, {
						immediate: false,
						duration: 1.0,
					});

					setTimeout(() => {
						isScrolling.current = false;
					}, 200);
				}
			} else {
				// Se não estiver numa posição válida, vai para a seção mais próxima
				const nearestIndex = getNearestSectionIndex();
				const targetScroll = sectionHeight * nearestIndex;

				isScrolling.current = true;
				wheelAccumulator.current = 0;

				lenis.scrollTo(targetScroll, {
					immediate: false,
					duration: 0.8,
				});

				setTimeout(() => {
					isScrolling.current = false;
				}, 100);
			}
		};

		// Detecta quando usuário para de fazer scroll
		const handleScrollEnd = () => {
			if (wheelTimeout.current) {
				clearTimeout(wheelTimeout.current);
			}

			// Só faz snap se não estiver animando e não estiver numa posição válida
			wheelTimeout.current = setTimeout(() => {
				if (!isScrolling.current && !isAtValidSectionPosition()) {
					snapToNearestSection();
				}
			}, 100);
		};

		// Monitora scroll para detectar scroll manual ou fim de animação
		const handleScroll = () => {
			// Se não estiver animando e scroll parou, agenda snap
			if (!isScrolling.current) {
				handleScrollEnd();
			}
		};

		// Detecta fim de animação do Lenis
		lenis.on('scroll', () => {
			if (!isScrolling.current) {
				handleScrollEnd();
			}
		});

		// Event listeners
		window.addEventListener('wheel', handleWheel, { passive: false });
		window.addEventListener('scroll', handleScroll, { passive: true });

		// Corrige posição inicial se necessário
		setTimeout(() => {
			if (!isAtValidSectionPosition()) {
				snapToNearestSection();
			}
		}, 100);

		return () => {
			window.removeEventListener('wheel', handleWheel);
			window.removeEventListener('scroll', handleScroll);

			if (wheelTimeout.current) {
				clearTimeout(wheelTimeout.current);
			}

			lenis.destroy();
		};
	}, []);

	return (
		<div className='min-h-screen'>
			<section className='relative flex h-screen items-center justify-between px-20'>
				<NoiseSurface className='absolute inset-0 -z-10' height={peaks} />
				<BubbleParticles />

				<main className='flex flex-col items-center gap-4 sm:items-start'>
					<h1 className='text-7xl font-bold'>Triângulo Studio's</h1>
					<code className='rounded bg-black/[.05] px-1 py-0.5 font-[family-name:var(--font-geist-mono)] font-semibold dark:bg-white/[.06]'>
						Componentes customizados
					</code>

					{/* Debug info - remova em produção */}
					<div className='mt-4 text-sm opacity-50'>
						Seção atual: {getCurrentSectionIndex()} | Scroll: {Math.round(window.scrollY || 0)}px
					</div>
				</main>

				<Compare firstImage={first.src} secondImage={second.src} />
			</section>

			<section
				className='flex h-screen w-full items-center justify-center text-4xl font-bold text-white'
				style={{ backgroundColor: '#f87171' }}
			>
				Seção 2
			</section>
			<section
				className='flex h-screen w-full items-center justify-center text-4xl font-bold text-white'
				style={{ backgroundColor: '#7185f8' }}
			>
				Seção 3
			</section>
			<section
				className='flex h-screen w-full items-center justify-center text-4xl font-bold text-white'
				style={{ backgroundColor: '#71f8c4' }}
			>
				Seção 4
			</section>
		</div>
	);
}
