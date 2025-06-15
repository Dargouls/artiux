import logo from '@/assets/brand/logo.svg';

import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Header({ ...props }: HeaderProps) {
	return (
		<>
			<header className='fixed top-0 z-[999] flex w-full items-center justify-between px-2 py-4 mix-blend-difference'>
				<Image src={logo} alt='logo' priority width={100} />
				<nav>
					<ul className='flex gap-4'>
						<li>
							<Link href='#'>Home</Link>
						</li>
						<li>
							<Link href='#'>About</Link>
						</li>
						<li>
							<Link href='#'>Services</Link>
						</li>
						<li>
							<Link href='#'>Contact</Link>
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
}
