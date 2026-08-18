'use client';

import { pageAnimation } from '@/artiux-components/circleTransition';
import { useIsMobile } from '@/artiux-hooks/use-mobile';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { useTransitionRouter } from 'next-view-transitions-gabriel-azv';
import NextLink, { LinkProps } from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { AnchorHTMLAttributes, cloneElement, isValidElement } from 'react';

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>, LinkProps {
	variant?: 'underline' | 'hover' | 'text' | 'ghost';
	asChild?: boolean;
	children?: React.ReactNode | undefined;
}

function Link({ variant, asChild = false, children, ...props }: Props) {
	const isMobile = useIsMobile();
	const { push } = useTransitionRouter();
	const router = useRouter();
	const pathname = usePathname();
	const route = props.href?.toString();

	const linkVariants = cva(`tracking-wider`, {
		variants: {
			variant: {
				underline: 'underline text-primary font-semibold hover:brightness-125',
				hover: 'hover:underline text-primary font-semibold hover:brightness-125',
				text: 'text-primary font-semibold hover:brightness-125',
				ghost: '',
			},
		},
		defaultVariants: {
			variant: 'text',
		},
	});

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		props.onClick?.(e);

		if (!route) return;

		if (route.startsWith('https://')) return window.open(route, '_blank', 'noopener,noreferrer');

		if (route.includes('#') && route.split('#')[0] === pathname) {
			push(route);
			return;
		}

		// Em mobile, navega sem view transition: o startViewTransition congela a
		// renderização e impede animações do DOM (ex.: fechamento da sidebar).
		if (isMobile) {
			router.push(route);
			return;
		}

		const expansionOrigin = {
			x: e.clientX,
			y: e.clientY,
		};

		push(route, {
			onTransitionReady: () => pageAnimation({ type: 'expansable', direction: 'horizontal', expansionOrigin }),
		});
	};

	if (asChild && isValidElement(children)) {
		// Clona o elemento filho e adiciona o onClick do Link
		const childProps = children.props as any;

		const clonedChild = cloneElement(children, {
			...childProps,
			onClick: (e: React.MouseEvent<HTMLElement>) => {
				childProps.onClick?.(e);
				handleClick(e as React.MouseEvent<HTMLAnchorElement>);
			},
			className: cn('cursor-pointer', childProps.className, props.className),
			style: {
				...childProps.style,
			},
		});

		return (
			<NextLink
				{...props}
				className='contents' // CSS class que faz o wrapper ser invisível
				onClick={handleClick}
			>
				{clonedChild}
			</NextLink>
		);
	}

	return (
		<NextLink {...props} className={cn(linkVariants({ variant }), props.className)} onClick={handleClick}>
			{children}
		</NextLink>
	);
}

export { Link };
