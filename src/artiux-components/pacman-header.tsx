'use client';

import type React from 'react';

import { animated, config, useSpring, useTrail } from '@react-spring/web';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { RainbowButton } from '@/components/ui/rainbow-button';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const navItems = [
	{ href: '/', label: 'Início' },
	{ href: '/components', label: 'Componentes' },
	{ href: '/contact', label: 'Contato' },
	{ href: 'https://www.gabriel-azv.com', label: 'Meu Portfólio', isExternal: true, isButton: true },
];

export default function PacmanHeader({ ...props }: HeaderProps) {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isEating, setIsEating] = useState(false);

	const pacmanSpring = useSpring({
		transform: isScrolled ? 'translateX(0%) scale(1)' : 'translateX(150%) scale(0.8)',
		opacity: isScrolled ? 1 : 0,
		config: config.wobbly,
	});

	const mouthSpring = useSpring({
		clipPath: isEating ? 'polygon(0% 0%, 100% 50%, 0% 100%)' : 'polygon(0% 0%, 70% 35%, 70% 65%, 0% 100%)',
		config: config.gentle,
	});

	const trail = useTrail(navItems.length, {
		transform: isEating
			? 'translateX(80px) scale(0.7) rotate(15deg)'
			: 'translateX(0px) scale(1) rotate(0deg)',
		opacity: isEating ? 0.2 : 1,
		config: config.wobbly,
		delay: isEating ? 0 : 200, // Delay no retorno para efeito mais suave
	});

	const headerBgSpring = useSpring({
		backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
		backdropFilter: isScrolled ? 'blur(12px)' : 'blur(8px)',
		borderBottomColor: isScrolled ? 'rgba(229, 231, 235, 0.8)' : 'rgba(229, 231, 235, 0.4)',
		config: config.gentle,
	});

	const particleSprings = useTrail(3, {
		transform: isEating ? 'scale(1)' : 'scale(0)',
		opacity: isEating ? 1 : 0,
		config: config.gentle,
		delay: (index) => Number(index) * 100,
	});

	useEffect(() => {
		const handleScroll = () => {
			const scrolled = window.scrollY > 0;

			if (scrolled && !isScrolled) {
				setIsScrolled(true);
				// Delay para começar a "comer" após o Pac-Man aparecer
				setTimeout(() => setIsEating(true), 500);
			} else if (!scrolled && isScrolled) {
				setIsEating(false);
				// Delay para o Pac-Man sumir após devolver a nav
				setTimeout(() => setIsScrolled(false), 800);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [isScrolled]);

	return (
		<>
			<animated.header
				style={headerBgSpring}
				className='fixed top-0 z-[999] flex items-center justify-between border-b px-4 py-4'
				{...props}
			>
				<div></div>

				<nav>
					<ul className='flex items-center gap-6'>
						{trail.map((style, index) => {
							const item = navItems[index];
							return (
								<animated.li key={item.href} style={style}>
									{item.isButton ? (
										<Link href={item.href} target='_blank'>
											<RainbowButton>{item.label}</RainbowButton>
										</Link>
									) : (
										<Link
											href={item.href}
											className='group relative font-medium transition-colors duration-200 hover:text-yellow-500'
											{...(item.isExternal && { target: '_blank' })}
										>
											{item.label}
											<span className='absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full'></span>
										</Link>
									)}
								</animated.li>
							);
						})}
					</ul>
				</nav>
			</animated.header>
		</>
	);
}
