import { Icon } from '@iconify/react/dist/iconify.js';
import { AnimatedGradientText } from '../ui/gradient-text';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function ModernCard({ ...props }: CardProps) {
	return (
		<>
			<div className='flex w-max flex-col items-center justify-center gap-2 rounded-[40px] bg-black p-4 shadow-md'>
				<Icon fontSize={40} icon='solar:user-bold' />
				<AnimatedGradientText>Content</AnimatedGradientText>
			</div>
		</>
	);
}
