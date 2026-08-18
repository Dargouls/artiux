import { cn } from '@/lib/utils';

interface Props extends React.SVGProps<SVGSVGElement> {}

const CircularProgress = ({ ...props }: Props) => {
	return (
		<>
			<style>{`
				@keyframes spinner-rotate {
					100% {
						transform: rotate(360deg);
					}
				}

				@keyframes spinner-dash {
					0% {
						stroke-dasharray: 1, 150;
						stroke-dashoffset: 0;
					}
					50% {
						stroke-dasharray: 90, 150;
						stroke-dashoffset: -35;
					}
					100% {
						stroke-dasharray: 90, 150;
						stroke-dashoffset: -124;
					}
				}

				.animate-spinner-rotate {
					animation: spinner-rotate 1.4s linear infinite;
				}

				.animate-spinner-dash {
					animation: spinner-dash 1.4s ease-in-out infinite;
				}
			`}</style>
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
		</>
	);
};

export { CircularProgress };
