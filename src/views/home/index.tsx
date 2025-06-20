'use client';

import useSnap from '@/hook/useSnap';
import { useRef, useState } from 'react';

import ret from '@/assets/brand/retangle.svg';
import gradient from '@/assets/images/Gradient.svg';
import next from '@/assets/images/next.png';
import react from '@/assets/images/react.png';
import tailwindcss from '@/assets/images/tailwindcss.png';
import typescript from '@/assets/images/typescript.png';

import Button from '@/components/button/button';
import CopyCode from '@/components/copyCode/copyCode';
import NoiseSurface from '@/components/meta-noise';
import MovingSquares from '@/components/movingSquares/movingSquares';
import { BubbleParticles } from '@/components/ui/background-beam';
import { PointerHighlight } from '@/components/ui/pointer-highlight';
import { SmoothCursor } from '@/components/ui/smooth-cursor';
import SpotlightCard from '@/components/ui/spotlight-card';
import MouseTrail from '@/components/ui/trail-cursor';
import useScrollSmoother from '@/hook/useScrollSmoother';
import Image from 'next/image';

export default function HomePage() {
	const [peaks, setPeaks] = useState(0.3);
	const mainRef = useRef<HTMLElement>(null);
	const cursorRef = useRef<HTMLElement>(null);
	const sectionRef = useRef<HTMLDivElement>(null);
	const elementRef = useRef<HTMLDivElement>(null);

	useSnap(mainRef as any);
	useScrollSmoother(sectionRef as any, elementRef as any);

	const staticBlocks = Array.from({ length: 16 }).map((_, i) => {
		// posições centrais do MovingSquares
		const isCenter = [5, 6, 9, 10].includes(i);
		return (
			<div key={i} className='aspect-square h-full w-full'>
				{isCenter ? null : (
					<div className='flex h-full w-full items-center justify-center rounded-md bg-neutral-800/20 text-xs text-white'></div>
				)}
			</div>
		);
	});
	return (
		<main ref={mainRef} className='min-h-screen'>
			<section className='panel relative flex h-screen items-center justify-between overflow-hidden px-20'>
				<NoiseSurface className='absolute inset-0 -z-10' height={peaks} />
				<BubbleParticles className='absolute inset-0 -z-10 h-full w-full' />

				<main className='flex flex-col items-center gap-4 sm:items-start'>
					<h1 className='text-7xl font-bold'>
						<PointerHighlight rectangleClassName='border-2 border-white' containerClassName=''>
							<span className='z-10'>ArtIux Studio's</span>
						</PointerHighlight>
					</h1>
					<code className='rounded bg-black/[.05] px-1 py-0.5 font-[family-name:var(--font-geist-mono)] font-semibold dark:bg-white/[.06]'>
						{/* Transforme suas ideias em componentes customizados */}
						Biblioteca de componentes altamente animados
					</code>
				</main>

				{/* <Compare firstImage={ideia.src} secondImage={second.src} /> */}
			</section>

			{/* init - Ignore section */}
			<section className='h-screen bg-gradient-to-b from-black to-black'>
				<div className='relative flex h-full w-full flex-col'>
					<Image src={ret} alt='logo' height={50} className='w-full' />
					<div className='flex-1 bg-white' />
				</div>
			</section>

			<section className='h-screen bg-gradient-to-b from-black to-black'>
				<div className='relative flex h-full w-full flex-col'>
					<div className='flex-1 bg-white' />
					<Image src={ret} alt='logo' height={50} className='w-full -translate-y-1 -rotate-180' />
				</div>
			</section>
			{/* end - Ignore section */}

			<div ref={sectionRef} className='relative border-x-[2.5rem] border-black'>
				<Image
					src={gradient.src}
					className='absolute !bottom-0 !left-0 !right-0 !top-20 !h-[calc(100%-20rem)] rounded-[48] bg-no-repeat object-cover'
					fill
					alt='fundo'
				/>
				<section className='panel flex h-screen w-full items-center justify-center pt-20 text-4xl font-bold'>
					<div className='relative z-10 h-full w-full overflow-hidden rounded-b-none text-center'>
						<div className='font-poppins absolute bottom-10 left-10 right-10 top-10 flex justify-between text-start text-3xl font-normal text-black'>
							<p className='max-w-[600px]'>
								Desenhado para funcionar com <b>Next.js</b>, <b>Tailwindcss</b>, <b>React</b> e{' '}
								<b>Typescript</b>
							</p>

							<div className='grid aspect-square grid-cols-4 grid-rows-4 gap-1 rounded-lg p-1'>
								{staticBlocks.map((block, i) =>
									[5, 6, 9, 10].includes(i) && i === 5 ? (
										<div key='moving' className='relative col-span-2 row-span-2'>
											<MovingSquares className='h-full w-full'>
												<SpotlightCard className='absolute bottom-0 top-0 rounded-md bg-slate-900'>
													<h1 className='text-2xl font-bold'>
														<Image src={next} alt='logo' width={60} className='space-y-4 invert' />
													</h1>
												</SpotlightCard>
												<SpotlightCard className='absolute bottom-0 top-0 rounded-md border-slate-900 bg-white/20'>
													<h1 className='text-2xl font-bold'>
														<Image src={typescript} alt='logo' width={60} className='space-y-4' />
													</h1>
												</SpotlightCard>
												<SpotlightCard className='absolute bottom-0 top-0 rounded-md border-slate-900 bg-white/20'>
													<h1 className='text-2xl font-bold'>
														<Image src={react} alt='logo' width={60} className='space-y-4' />
													</h1>
												</SpotlightCard>
												<SpotlightCard className='absolute bottom-0 top-0 rounded-md bg-slate-900'>
													<h1 className='text-2xl font-bold'>
														<Image src={tailwindcss} alt='logo' width={60} className='space-y-4' />
													</h1>
												</SpotlightCard>
											</MovingSquares>
										</div>
									) : [6, 9, 10].includes(i) ? null : (
										block
									)
								)}
							</div>
						</div>
					</div>
				</section>

				<section className='panel relative flex h-screen flex-col justify-between text-center'>
					<nav className='flex flex-1 items-end justify-center gap-4 px-4 pb-7'>
						<CopyCode />
					</nav>
					<div className='h-56'>
						<h1 className='font-poppins pt-8 text-4xl font-light'>
							Apenas copie e cole os componentes
							<p>e use</p>
						</h1>

						<Button>Copy</Button>
					</div>
					{/* <picture className='absolute left-0 top-0 h-1/2 w-full select-none rounded-[48px] rounded-t-none bg-black'></picture> */}
					{/* <Image
							src={gradient}
							alt='logo'
							className='absolute top-0 h-1/2 w-full select-none rounded-[48px] rounded-t-none object-cover'
						/> */}
					{/* <main className='z-10'>
							<div className='col-span-3 flex items-center justify-center border-black p-4'>
								<DraggableBox className='2 h-full w-full'>
									<PieChart />
									<BarChart />
									<LineChart />
								</DraggableBox>
							</div>
						</main> */}

					{/* <div className='absolute -bottom-32 h-full w-full overflow-hidden'>
					<CardSwap />
				</div> */}
				</section>
			</div>

			<section
				className='panel flex h-screen w-full items-center justify-center text-4xl font-bold text-white'
				style={{ backgroundColor: '#71f8c4' }}
			>
				Seção 4
			</section>

			<SmoothCursor ref={cursorRef as any} />
			<MouseTrail
				lineColor='#fff'
				// lineThickness={6}
				// dashArray='8 20'
				lineThickness={2}
				dashArray='8 10'
				maxTrailLength={20}
				fadeDuration={1000}
				segmentLength={5}
				smoothCursorRef={cursorRef as any} // AGORA O RASTRO SEGUE O CURSOR SUAVIZADO
			/>
		</main>
	);
}
