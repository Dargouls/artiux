import logo from '@/assets/brand/logo.svg';
import { RainbowButton } from '@/components/ui/rainbow-button';

import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Header({ ...props }: HeaderProps) {
	return (
		<>
			<header className='fixed top-0 z-[999] flex w-full items-center justify-between px-2 py-4'>
				<Link href={'/'}>
					<Image src={logo} alt='logo' priority width={100} />
				</Link>
				<nav>
					<ul className='flex items-center gap-4'>
						<li>
							<Link href='/'>Início</Link>
						</li>
						<li>
							<Link href='/components'>Componentes</Link>
						</li>
						<li>
							<Link href='/contact'>Contato</Link>
						</li>
						<li>
							<Link href='https://www.gabriel-azv.com' target='_blank'>
								<RainbowButton>Meu Portfólio</RainbowButton>
							</Link>
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
}
