'use client';

import { HTMLMotionProps, motion } from 'motion/react';

const PageWrapper = (props: HTMLMotionProps<'div'>) => {
	return (
		<div>
			<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} {...props} />
		</div>
	);
};

export default PageWrapper;
