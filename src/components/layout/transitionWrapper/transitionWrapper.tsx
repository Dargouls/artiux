'use client';

import { HTMLMotionProps, motion } from 'motion/react';

// Component for page transition (testing)
const TransitionWrapper = (props: HTMLMotionProps<'div'>) => {
	return (
		<div>
			<motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} {...props} />
		</div>
	);
};

export default TransitionWrapper;
