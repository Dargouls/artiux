import { Icon } from '@iconify/react/dist/iconify.js';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function ModernCard({ ...props }: CardProps) {
	return (
		<>
			<div className=''>
				<Icon
					fontSize={40}
					icon='solar:user-bold'
					className='bg-gradient-to-br from-fuchsia-500 via-purple-500 to-pink-500 bg-clip-text text-[40px] text-transparent'
				/>

				<h1>Content</h1>
			</div>
		</>
	);
}
