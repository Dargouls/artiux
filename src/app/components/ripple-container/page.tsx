'use client';

import { useState } from 'react';

import CopyCode from '@/components/copyCode/copyCode';
import { ControlColor, Customize } from '@/components/customize/customize';
import { PropsTable } from '@/components/customize/propsTable';

import { RippleContainer } from '@/artiux-components/rippleContainer';
import PreviewCode from '@/components/previewCode/previewCode';

export default function RippleContainerComponent() {
	const [color, setColor] = useState('#919191');

	const props = [`color='${color}'`].filter(Boolean).join(' ');

	const previewCode = `
import { RippleContainer } from '@/artiux-components/rippleContainer';

<RippleContainer ${props}>
	<button className='bg-primary text-primary-foreground ml-4 rounded-md px-4 py-2 hover:brightness-95'>
		Eu sou um botão
	</button>
</RippleContainer>
`;

	return (
		<>
			<div>
				<h1 className='mt-20 text-5xl font-bold'>Ripple Container</h1>
				<p className='text-muted-foreground mt-4 block text-xl'>
					Container flexível com animação de ripple (útil também para botões)
				</p>
			</div>

			<section className='my-8'>
				<h3 className='text-2xl font-bold'>Código:</h3>
				<div className='mt-4 h-52 place-content-start'>
					<CopyCode installs='yarn add motion' code={componentCode} />
				</div>
			</section>

			<section className='my-8'>
				<PreviewCode code={previewCode}>
					<RippleContainer color={color}>
						<div className='bg-secondary text-primary-foreground flex h-12 w-32 items-center justify-center rounded-md'>
							Eu sou uma div
						</div>
					</RippleContainer>
					<RippleContainer color={color}>
						<button className='bg-primary text-primary-foreground ml-4 rounded-md px-4 py-2 hover:brightness-95'>
							Eu sou um botão
						</button>
					</RippleContainer>
				</PreviewCode>
			</section>

			<section className='my-8'>
				<Customize>
					<ControlColor label='Color' value={color} onChange={setColor} />
				</Customize>
			</section>

			<section className='my-8'>
				<PropsTable rows={propRows} />
			</section>
		</>
	);
}

const propRows = [
	{
		property: 'color',
		type: 'string',
		default: "'rgba(56, 56, 56, 0.4)'",
		description: 'Cor do efeito ripple exibido ao clicar no elemento filho.',
	},
	{ property: 'children', type: 'React.ReactElement', description: 'Elemento único que receberá o efeito de ripple ao ser clicado.' },
];

const componentCode = `
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
	color?: string;
	children: React.ReactElement<any, any>;
}

export function RippleContainer({ color = 'rgba(56, 56, 56, 0.4)', children }: RippleContainerProps) {
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
								backgroundColor: color,
								pointerEvents: 'none',
							}}
						/>
					))}
				</AnimatePresence>
			</>
		),
	});
}
`;
