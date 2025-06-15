'use client';

import { useRef, useState } from 'react';

import ret from '@/assets/brand/retangle.svg';
import gradient from '@/assets/images/Gradient.svg';

import BarChart from '@/components/barChart/barChart';
import DraggableBox from '@/components/draggableBox/draggableBox';
import LineChart from '@/components/lineChart/lineChart';
import NoiseSurface from '@/components/meta-noise';
import ModernCard from '@/components/modernCard/modernCard';
import PieChart from '@/components/pieChart/pieChart';
import Radio from '@/components/radio/radio';
import { BubbleParticles } from '@/components/ui/background-beam';
import { PointerHighlight } from '@/components/ui/pointer-highlight';
import { SmoothCursor } from '@/components/ui/smooth-cursor';
import MouseTrail from '@/components/ui/trail-cursor';
import useSnap from '@/hook/useSnap';
import Image from 'next/image';

export default function Home() {
	const [peaks, setPeaks] = useState(0.3);
	const mainRef = useRef<HTMLElement>(null);
	const cursorRef = useRef<HTMLElement>(null);

	useSnap(mainRef as any);

	return (
		<main ref={mainRef} className='min-h-screen'>
			<section className='panel relative flex h-screen items-center justify-between overflow-hidden px-20'>
				<NoiseSurface className='absolute inset-0 -z-10' height={peaks} />
				<BubbleParticles className='absolute inset-0 -z-10 h-full w-full' />
				{/* <SmoothCursor /> */}

				<main className='flex flex-col items-center gap-4 sm:items-start'>
					<h1 className='text-7xl font-bold'>
						<PointerHighlight rectangleClassName='border-2 border-white' containerClassName=''>
							<span className='z-10'>ArtIux Studio's</span>
						</PointerHighlight>
					</h1>
					<code className='rounded bg-black/[.05] px-1 py-0.5 font-[family-name:var(--font-geist-mono)] font-semibold dark:bg-white/[.06]'>
						Transforme suas ideias em componentes customizados
					</code>
				</main>

				{/* <Compare firstImage={ideia.src} secondImage={second.src} /> */}
			</section>

			<section className='h-screen bg-gradient-to-b from-black to-black'>
				<div className='relative flex h-full w-full flex-col'>
					<Image src={ret} alt='logo' height={50} className='w-full' />
					<div className='flex-1 bg-white' />

					{/* <Image src={ret} alt='logo' height={50} className='w-full -translate-y-1 -rotate-180' /> */}
				</div>
			</section>
			<section className='h-screen bg-gradient-to-b from-black to-black'>
				<div className='relative flex h-full w-full flex-col'>
					{/* <Image src={ret} alt='logo' height={50} className='w-full' /> */}
					<div className='flex-1 bg-white' />
					<Image src={ret} alt='logo' height={50} className='w-full -translate-y-1 -rotate-180' />
				</div>
			</section>

			<section className='panel flex h-screen w-full select-none items-center justify-center bg-black p-16 pt-20 text-4xl font-bold'>
				<div className='relative h-full w-full overflow-hidden rounded-[50px] text-center'>
					<ModernCard />
					<Image src={gradient} alt='logo' className='h-full w-full object-cover' />
				</div>
			</section>

			<section className='panel font-libre_baskerville relative h-screen w-full bg-[#e6ccb2] pt-20 font-bold text-[#d97757]'>
				<Radio />

				<div className='grid h-full grid-cols-1 rounded-md lg:grid-cols-6'>
					<div className='col-span-4 flex items-center justify-center border-b-2 border-r-2 border-black p-4'>
						<button className='text-normal border border-indigo-500 bg-transparent px-3 py-2 tracking-wider text-indigo-500 shadow-[2px_2px_0_0_rgba(0,0,0,1)] shadow-indigo-500'>
							Alternar bordas
						</button>
					</div>
					<div className='col-span-2 flex items-center justify-center border-b-2 border-black p-4'>UHUU</div>

					<div className='col-span-3 flex items-center justify-center border-r-2 border-black p-4'>UHUU</div>
					<div className='col-span-3 flex items-center justify-center border-black p-4'>
						<DraggableBox className='2 h-full w-full'>
							<PieChart />
							<BarChart />
							<LineChart />
						</DraggableBox>
					</div>
				</div>
				{/* <div className='absolute -bottom-32 h-full w-full overflow-hidden'>
					<CardSwap />
				</div> */}
			</section>

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
