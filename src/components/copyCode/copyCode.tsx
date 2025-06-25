'use client';

import { Maximize2 } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import CodeButton from './codebutton';

interface CopyCodeProps extends React.HTMLAttributes<HTMLDivElement> {
	installs?: string;
	code?: string;
}

const previewCode = `'use client';

import { Copy } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

interface CopyCodeProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function CopyCode({ ...props }: CopyCodeProps) {
	const background = '#09090B';
	const border = '#3B341F';
	const ref = useRef(null);
	const isInView = useInView(ref, { once: false, margin: '-100px' });
	
	return (`;

const previewInstalls = `yarn add @motion/react`;

export default function CopyCode({
	installs = previewInstalls,
	code = previewCode,
	...props
}: CopyCodeProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: false, margin: '-100px' });

	return (
		<>
			<div className='relative flex w-max flex-col items-center justify-center font-mono text-white'>
				<motion.div
					ref={ref}
					initial={{ height: 0 }}
					animate={isInView && { height: '10rem' }}
					transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
					className='relative w-[calc(100%-2rem)] max-w-80 overflow-hidden rounded-2xl rounded-b-none border-2 border-b-0 border-[#3B341F] bg-[#09090B] p-2 text-start text-xs shadow-2xl'
				>
					<nav className='absolute right-2 top-2 flex gap-2'>
						<CodeButton code={code} />
						<Maximize2 size={16} />
					</nav>
					<pre className='whitespace-pre-wrap break-words font-mono'>{code}</pre>
				</motion.div>
				<div className='flex w-max min-w-80 items-center justify-center gap-2 rounded-full border-2 border-[#3B341F] bg-[#09090B] px-4 py-2 text-start shadow-2xl'>
					<pre className='whitespace-pre-wrap break-words font-mono'>{installs}</pre>
					<div className='h-4 w-0.5 bg-[#3B341F]'></div>

					<CodeButton code={installs} />
				</div>
			</div>
		</>
	);
}
