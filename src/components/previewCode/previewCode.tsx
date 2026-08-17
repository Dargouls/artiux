'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { Button } from '@/artiux-components/button';
import { motion } from 'motion/react';
import CodeButton from '../copyCode/codebutton';

interface PreviewCodeProps extends React.HTMLAttributes<HTMLDivElement> {
	code: string;
}

export default function PreviewCode({ children, code, ...props }: PreviewCodeProps) {
	const [pre, setPre] = useState<'Prévia' | 'Uso'>('Prévia');
	const list = ['Prévia', 'Uso'];

	return (
		<>
			<h3 className='text-2xl font-bold'>Prévia:</h3>

			<div className='inline-flex'>
				{list.map((item) => (
					<Button
						key={item}
						variant='ghost'
						size='sm'
						className={`bg-background hover:bg-background relative rounded-none px-2 py-1 ${
							pre === item ? 'text-primary' : 'text-muted-foreground'
						}`}
						onClick={() => setPre(item as typeof pre)}
					>
						{item}
						{item === pre && (
							<motion.div
								className='bg-primary absolute inset-x-0 bottom-[1px] mx-auto h-0.5 w-[90%]'
								layoutId='activeTab'
								initial={false}
								transition={{
									type: 'spring',
									stiffness: 500,
									damping: 30,
								}}
							/>
						)}
					</Button>
				))}
			</div>

			<div className='border-border scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-zinc-100/0 relative mt-1 overflow-auto border'>
				{pre === 'Uso' && (
					<div className='relative max-h-96'>
						<CodeButton code={code} className='sticky top-4 z-10 flex place-self-end pr-4' />
						<SyntaxHighlighter
							language='tsx'
							style={oneDark}
							customStyle={{
								margin: 0,
								marginTop: -16,
								fontSize: '0.875rem',
							}}
						>
							{code}
						</SyntaxHighlighter>
					</div>
				)}

				{pre === 'Prévia' && <div className='@container flex h-96 w-full items-center justify-center overflow-auto'>{children}</div>}
			</div>
		</>
	);
}
