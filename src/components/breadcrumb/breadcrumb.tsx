'use client';

import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

import { Icon } from '@/artiux/components/icons';
import { Link } from '@/components/link';

function humanizeSegment(segment: string) {
	return segment
		.replace(/-/g, ' ')
		.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
		.trim()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

export default function Breadcrumb() {
	const pathname = usePathname();
	const segments = pathname.split('/').filter(Boolean);

	if (segments.length < 2) return null;

	const items = segments.map((segment, index) => ({
		label: humanizeSegment(segment),
		href: '/' + segments.slice(0, index + 1).join('/'),
	}));

	return (
		<nav className='mt-20 flex items-center gap-2 text-sm text-muted-foreground' aria-label='Breadcrumb'>
			{items.map((item, index) => {
				const isLast = index === items.length - 1;

				return (
					<Fragment key={item.href}>
						{index > 0 && <Icon icon='chevron-right' className='size-3.5' />}
						{isLast ? (
							<span className='font-medium text-foreground'>{item.label}</span>
						) : (
							<Link href={item.href} variant='ghost' className='hover:text-foreground'>
								{item.label}
							</Link>
						)}
					</Fragment>
				);
			})}
		</nav>
	);
}
