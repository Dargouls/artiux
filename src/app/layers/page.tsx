'use client';

import { useState } from 'react';

import { motion } from 'motion/react';

export default function Layers() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<main className='flex h-screen w-screen items-center'>
				<motion.div
					className='flex items-center justify-center bg-gray-400'
					initial={{ height: 50, width: 100, borderRadius: 50 }}
					animate={open && { height: '100vh', width: '100vw', borderRadius: 0 }}
					onClick={() => setOpen(!open)}
					transition={{
						duration: 0.5,

						ease: [0.42, 0, 0.58, 1],
					}}
				>
					<span className={open ? 'opacity-0 transition-all duration-500' : ''}>Olá</span>
				</motion.div>
			</main>
		</>
	);
}
