'use client';

import useSnap from '@/hook/useSnap';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import ret from '@/assets/brand/retangle.svg';

import BubbleButton from '@/artiux-components/bubbleButton';
import { Button } from '@/artiux-components/button';
import { ButtonGroup } from '@/artiux-components/buttonGroup';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/artiux-components/card';
import { CheckboxComposeItem } from '@/artiux-components/checkboxCompose';
import { InputNumber } from '@/artiux-components/inputNumber';
import { MultiSelect } from '@/artiux-components/multiSelect';
import { Select } from '@/artiux-components/select';
import { Text } from '@/artiux-components/text';
import { useIsMobile } from '@/artiux-hooks/use-mobile';
import CopyCode from '@/components/copyCode/copyCode';
import Grainient from '@/components/grainient';
import NoiseSurface from '@/components/meta-noise';
import PageLoader from '@/components/pageLoader/pageLoader';
import { BubbleParticles } from '@/components/ui/background-beam';
import { PointerHighlight } from '@/components/ui/pointer-highlight';
import { SmoothCursor } from '@/components/ui/smooth-cursor';
import MouseTrail from '@/components/ui/trail-cursor';
import useScrollSmoother from '@/hook/useScrollSmoother';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function HomePage() {
	const [loading, setLoading] = useState(true);
	const [peaks, setPeaks] = useState(0.3);
	const mainRef = useRef<HTMLElement>(null);
	const cursorRef = useRef<HTMLElement>(null);
	const sectionRef = useRef<HTMLDivElement>(null);
	const elementRef = useRef<HTMLDivElement>(null);

	const isMobile = useIsMobile();
	const { push } = useRouter();

	useSnap(mainRef as any);
	useScrollSmoother(sectionRef as any, elementRef as any);

	const { control: statusControl } = useForm({ defaultValues: { status: '' } });
	const { control: frameworksControl } = useForm({ defaultValues: { frameworks: [] } });
	const { control: quantidadeControl } = useForm({ defaultValues: { quantidade: 1 } });

	const statusOptions = [
		{ label: 'Ativo', value: 'ativo' },
		{ label: 'Inativo', value: 'inativo' },
		{ label: 'Pendente', value: 'pendente' },
	];

	const frameworkOptions = [
		{ value: 'react', label: 'React' },
		{ value: 'nextjs', label: 'Next.js' },
		{ value: 'tailwind', label: 'Tailwind' },
		{ value: 'typescript', label: 'TypeScript' },
		{ value: 'javascript', label: 'JavaScript' },
	];

	return (
		<>
			<PageLoader onFinish={() => setLoading(false)} />
			<main ref={mainRef} className={`min-h-screen transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}>
				<section className='panel relative flex h-screen items-center justify-between overflow-hidden px-10 sm:px-20'>
					<NoiseSurface className='absolute inset-0 -z-10' height={peaks} />
					<BubbleParticles className='absolute inset-0 -z-10 h-full w-full' />

					<main className='flex flex-col items-center gap-4 sm:items-start'>
						<h1 className='text-7xl font-bold'>
							<PointerHighlight rectangleClassName='border-2 border-white' containerClassName=''>
								<span className='z-10'>ArtIux Lab</span>
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
				<section className='hidden h-screen bg-gradient-to-b from-black to-black md:block'>
					<div className='relative flex h-full w-full flex-col'>
						<Image src={ret} alt='logo' height={50} className='w-full' />
						<div className='flex-1 bg-white' />
					</div>
				</section>

				<section className='block md:hidden'>
					<Image src={ret} alt='logo' height={50} className='w-full' />
					<Image src={ret} alt='logo' height={50} className='w-full -translate-y-1 -rotate-180' />
				</section>

				<section className='hidden h-screen bg-gradient-to-b from-black to-black md:block'>
					<div className='relative flex h-full w-full flex-col'>
						<div className='flex-1 bg-white' />
						<Image src={ret} alt='logo' height={50} className='w-full -translate-y-1 -rotate-180' />
					</div>
				</section>
				{/* end - Ignore section */}

				<div ref={sectionRef} className='relative'>
					<div className='absolute left-0 right-0 px-10'>
						<Grainient
							className='absolute !bottom-0 !left-0 !right-0 !top-20 !h-[calc(150vh)] rounded-[48]'
							color1='#3e193e'
							color2='#fefefe'
							color3='#47484d'
							timeSpeed={0.25}
							colorBalance={0}
							warpStrength={1}
							warpFrequency={8}
							warpSpeed={1.3}
							warpAmplitude={5}
							blendAngle={0}
							blendSoftness={0.05}
							rotationAmount={500}
							noiseScale={2}
							grainAmount={0.1}
							grainScale={2}
							grainAnimated={false}
							contrast={1.5}
							gamma={1}
							saturation={1}
							centerX={0}
							centerY={0}
							zoom={0.9}
						/>
					</div>

					<section className='panel @container flex h-screen w-full items-center justify-center pt-20 font-bold'>
						<div className='relative z-10 flex h-full w-full flex-col items-center justify-center gap-8 overflow-hidden rounded-b-none text-center'>
							<p className='max-w-xl text-3xl text-black'>
								Desenhado para funcionar com <b>Next.js</b>, <b>Tailwindcss</b>, <b>React</b> e <b>Typescript</b>
							</p>

							<div className='grid w-full max-w-5xl grid-cols-1 gap-4 px-4 text-left sm:grid-cols-2 lg:grid-cols-3'>
								<Card className='items-start'>
									<CardHeader>
										<CardTitle>Select</CardTitle>
										<CardDescription>Seletor em drawer</CardDescription>
									</CardHeader>
									<CardContent>
										<Select name='status' control={statusControl} options={statusOptions} placeholder='Selecionar status' />
									</CardContent>
								</Card>

								<Card className='items-start'>
									<CardHeader>
										<CardTitle>Multi Select</CardTitle>
										<CardDescription>Múltipla escolha com busca</CardDescription>
									</CardHeader>
									<CardContent>
										<MultiSelect
											name='frameworks'
											control={frameworksControl as any}
											options={frameworkOptions}
											placeholder='Selecionar'
											maxSelections={2}
										/>
									</CardContent>
								</Card>

								<Card className='items-start'>
									<CardHeader>
										<CardTitle>Button Group</CardTitle>
										<CardDescription>Botões agrupados</CardDescription>
									</CardHeader>
									<CardContent>
										<ButtonGroup>
											<Button size='sm' variant='secondary'>
												Um
											</Button>
											<Button size='sm' variant='secondary'>
												Dois
											</Button>
											<Button size='sm' variant='secondary'>
												Três
											</Button>
										</ButtonGroup>
									</CardContent>
								</Card>

								<Card ripple className='items-start space-y-2'>
									<CardHeader>
										<CardTitle>Card</CardTitle>
										<CardDescription>Subtítulo</CardDescription>
									</CardHeader>

									<CardContent>
										<Text>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultricies mi vitae est. Pellentesque habitant morbi.
										</Text>
									</CardContent>

									<CardFooter className='w-full'>
										<Button>Continuar</Button>
									</CardFooter>
								</Card>

								<Card className='items-start'>
									<CardHeader>
										<CardTitle>Input Number</CardTitle>
										<CardDescription>Incremento e decremento</CardDescription>
									</CardHeader>
									<CardContent>
										<InputNumber name='quantidade' control={quantidadeControl} min={0} max={15} step={1} />
									</CardContent>
								</Card>

								<Card className='items-start'>
									<CardHeader>
										<CardTitle>Checkbox Compose</CardTitle>
										<CardDescription>Checkbox com mais elementos</CardDescription>
									</CardHeader>
									<CardContent>
										<CheckboxComposeItem title='Checkbox Compose' description='Card de checkbox com título e descrição' />
									</CardContent>
								</Card>
							</div>
						</div>
					</section>

					<section className='panel relative flex h-screen flex-col justify-between text-center'>
						<nav className='flex flex-1 items-end justify-center gap-4 px-4 pb-7'>
							<CopyCode />
						</nav>
						<div className='flex h-56 flex-col items-center gap-4 pt-6'>
							<h1 className='font-poppins text-4xl font-light'>
								Apenas copie e cole os componentes
								<p>e use</p>
							</h1>

							<BubbleButton className='py-4' loading={false} onClick={() => push('/components')}>
								Ver Componentes
							</BubbleButton>
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

				{/* <section
				className='panel flex h-screen w-full items-center justify-center text-4xl font-bold text-white'
				style={{ backgroundColor: '#71f8c4' }}
			>
				Seção 4
			</section> */}

				{!isMobile && (
					<>
						<SmoothCursor
							ref={cursorRef as any}
							springConfig={{
								damping: 40,
								stiffness: 800,
								mass: 0.5,
								restDelta: 0.01,
							}}
						/>
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
					</>
				)}
			</main>
		</>
	);
}
