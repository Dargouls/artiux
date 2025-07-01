interface pageAnimationProps {
	direction: 'vertical' | 'horizontal';
}

const directionMap = {
	vertical: 'translateY',
	horizontal: 'translateX',
};

export const pageAnimation = ({ direction = 'vertical' }: pageAnimationProps) => {
	document.documentElement.animate(
		[
			{
				opacity: 1,
				scale: 1,
				transform: `${directionMap[direction]}(0)`,
			},
			{
				opacity: 0.5,
				scale: 0.9,
				transform: `${directionMap[direction]}(-100px)`,
			},
		],
		{
			duration: 1000,
			easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
			fill: 'forwards',
			pseudoElement: '::view-transition-old(root)',
		}
	);

	document.documentElement.animate(
		[
			{
				transform: `${directionMap[direction]}(100%)`,
			},
			{
				transform: `${directionMap[direction]}(0)`,
			},
		],
		{
			duration: 1000,
			easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
			fill: 'forwards',
			pseudoElement: '::view-transition-new(root)',
		}
	);
};
