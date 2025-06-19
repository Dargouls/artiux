'use client';

import useSnap from '@/hook/useSnap';
import { useRef, useState } from 'react';

import ret from '@/assets/brand/retangle.svg';
import gradient from '@/assets/images/Gradient.svg';

import Button from '@/components/button/button';
import NoiseSurface from '@/components/meta-noise';
import { BubbleParticles } from '@/components/ui/background-beam';
import { PointerHighlight } from '@/components/ui/pointer-highlight';
import { SmoothCursor } from '@/components/ui/smooth-cursor';
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
					<div className='relative h-full w-full overflow-hidden rounded-b-none text-center'>
						<main className='z-10 h-full w-full'>
							<div className='font-poppins absolute left-10 top-10 max-w-[600px] text-start text-3xl font-normal text-black'>
								Desenhado para funcionar com <b>Next.js</b>, <b>Tailwindcss</b>, <b>React</b> e{' '}
								<b>Typescript</b>
							</div>
						</main>
					</div>
				</section>

				<section className='panel relative flex h-screen flex-col justify-between text-center'>
					<nav className='flex flex-1 items-end gap-4 px-4 pb-7'></nav>
					<div className='h-56'>
						<h1 className='font-poppins pt-8 text-4xl font-light'>Apenas copie e cole os componentes</h1>

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
