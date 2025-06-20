'use client';

import { Copy, Maximize2 } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

interface CopyCodeProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function CopyCode({ ...props }: CopyCodeProps) {
	const background = '#09090B';
	const border = '#3B341F';
	const ref = useRef(null);
	const isInView = useInView(ref, { once: false, margin: '-100px' }); // `once` impede repetição

	return (
		<>
			<div className='relative flex flex-col items-center justify-center font-mono text-white'>
				<motion.div
					ref={ref}
					initial={{ height: 0 }}
					animate={isInView && { height: '10rem' }}
					transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
					className='relative w-[calc(100%-2rem)] max-w-60 overflow-hidden rounded-2xl rounded-b-none border-2 border-b-0 border-[#3B341F] p-2 text-start text-xs shadow-2xl'
					style={{ background: background }}
				>
					<nav className='absolute right-2 top-2 flex gap-2'>
						<Copy size={16} />
						<Maximize2 size={16} />
					</nav>
					<pre className='whitespace-pre-wrap break-words font-mono'>
						{`'use client';

import { Copy } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

interface CopyCodeProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function CopyCode({ ...props }: CopyCodeProps) {
	const background = '#09090B';
	const border = '#3B341F';
	const ref = useRef(null);
	const isInView = useInView(ref, { once: false, margin: '-100px' });
	
	return (`}
					</pre>
				</motion.div>
				<div
					className='flex w-max items-center gap-2 rounded-full border-2 border-[#3B341F] px-4 py-2 text-start shadow-2xl'
					style={{ background: background }}
				>
					<span className='flex-1'>yarn add @motion/react</span>
					<div className='h-4 w-0.5 bg-[#3B341F]'></div>
					<Copy size={16} className='' />
				</div>
			</div>
		</>
	);
}
