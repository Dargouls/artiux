import { cn } from '@/lib/utils';

interface Props extends React.SVGProps<SVGSVGElement> {}

const CircularProgress = ({ ...props }: Props) => {
	return (
		<svg {...props} viewBox='0 0 50 50' className={cn('animate-spinner-rotate size-8', props.className)}>
			<circle
				cx='25'
				cy='25'
				r='20'
				fill='none'
				stroke='currentColor'
				strokeWidth='4'
				strokeLinecap='round'
				className='animate-spinner-dash'
			/>
		</svg>
	);
};

export { CircularProgress };
