'use client';

import { AnimatePresence, motion } from 'motion/react';
import React, { useCallback, useRef, useState } from 'react';

interface RippleProps {
	x: number;
	y: number;
	size: number;
	id: number;
}

interface RippleContainerProps {
	children: React.ReactElement<any, any>;
}

export function RippleContainer({ children }: RippleContainerProps) {
	const [ripples, setRipples] = useState<RippleProps[]>([]);
	const containerRef = useRef<HTMLElement>(null);
	const rippleCount = useRef(0);

	const addRipple = useCallback((event: React.MouseEvent<HTMLElement>) => {
		const container = containerRef.current;
		if (!container) return;

		const rect = container.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		const size = Math.max(rect.width, rect.height) * 2;
		const id = rippleCount.current;
		rippleCount.current += 1;

		setRipples((prev) => [...prev, { x, y, size, id }]);
		setTimeout(() => {
			setRipples((prev) => prev.filter((r) => r.id !== id));
		}, 850);
	}, []);

	const mergeClasses = (childClassName?: string, extraClassName?: string) =>
		[childClassName, extraClassName].filter(Boolean).join(' ');

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		if (children.props.onClick) {
			children.props.onClick(event);
		}
		addRipple(event);
	};

	// Aqui forçamos o type do children para garantir que temos acesso a children.props
	const child = children as React.ReactElement<any, any>;

	return React.cloneElement(child, {
		ref: containerRef,
		onClick: handleClick,
		className: mergeClasses(child.props.className, 'relative overflow-hidden'),
		children: (
			<>
				{child.props.children}
				<AnimatePresence>
					{ripples.map((ripple) => (
						<motion.span
							key={ripple.id}
							initial={{
								width: 0,
								height: 0,
								opacity: 0.5,
								top: ripple.y,
								left: ripple.x,
								transform: 'translate(-50%, -50%)',
							}}
							animate={{
								width: ripple.size,
								height: ripple.size,
								opacity: 0,
								top: ripple.y,
								left: ripple.x,
								transform: 'translate(-50%, -50%)',
							}}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.85, ease: 'easeOut' }}
							style={{
								position: 'absolute',
								borderRadius: '50%',
								backgroundColor: 'rgba(56, 56, 56, 0.4)',
								pointerEvents: 'none',
							}}
						/>
					))}
				</AnimatePresence>
			</>
		),
	});
}
