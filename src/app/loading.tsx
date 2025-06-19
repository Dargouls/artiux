'use client';

import logo from '@/assets/brand/logo-mini.png';

import { motion } from 'motion/react';
import Image from 'next/image';

export default function Test() {
	return (
		<>
			<div className='flex h-screen items-center justify-center'>
				<motion.div
					animate={{ rotateY: 360 }}
					transition={{
						repeat: Infinity,
						duration: 2,
						ease: 'linear',
					}}
				>
					<Image src={logo} alt='Logo' width={200} />
				</motion.div>
			</div>
		</>
	);
}
