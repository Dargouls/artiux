'use client';

import { Sheet } from '@/artiux-components/sheet';
import { useIsMobile } from '@/artiux-hooks/use-mobile';
import logo from '@/assets/brand/logo.svg';
import { Link } from '@/components/link';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { Menu } from 'lucide-react';

import Image from 'next/image';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Header({ ...props }: HeaderProps) {
	const isMobile = useIsMobile();

	return (
		<>
			<header className='fixed top-0 z-[999] flex w-full items-center justify-between px-2 pt-4'>
				<Link href={'/'}>
					<Image src={logo} alt='logo' priority width={100} />
				</Link>

				{isMobile ? <NavMobile /> : <NavDesktop />}
			</header>
		</>
	);
}

const NavMobile = () => {
	return (
		<>
			<Sheet>
				<Sheet.Trigger asChild>
					<Menu />
				</Sheet.Trigger>

				<Sheet.Content className='p-10'>
					<nav>
						<ul className='flex flex-col gap-4'>
							<li>
								<Link href='/'>Início</Link>
							</li>
							<li>
								<Link href='/components'>Componentes</Link>
							</li>
							{/* <li>
								<Link href='/contact'>Contato</Link>
							</li> */}
							<li>
								<Link href='https://www.gabrielzv.com' target='_blank'>
									<RainbowButton>Meu Portfólio</RainbowButton>
								</Link>
							</li>
						</ul>
					</nav>
				</Sheet.Content>
			</Sheet>
		</>
	);
};

const NavDesktop = () => {
	return (
		<nav>
			<ul className='flex items-center gap-4 rounded-full bg-black/10 p-4 backdrop-blur-md'>
				<li>
					<Link href='/'>Início</Link>
				</li>
				<li>
					<Link href='/components'>Componentes</Link>
				</li>
				{/* <li>
					<Link href='/contact'>Contato</Link>
				</li> */}
				<li>
					<Link href='https://www.gabrielzv.com' target='_blank'>
						<RainbowButton>Meu Portfólio</RainbowButton>
					</Link>
				</li>
			</ul>
		</nav>
	);
};
