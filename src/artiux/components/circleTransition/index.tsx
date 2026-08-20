interface PageAnimationProps {
	type?: 'slide' | 'expansable';
	direction?: 'vertical' | 'horizontal';
	expansionOrigin?: { x: number; y: number }; // centro da expansão
}

const directionMap = {
	vertical: 'translateY',
	horizontal: 'translateX',
};

export const pageAnimation = ({ type = 'slide', direction = 'vertical', expansionOrigin }: PageAnimationProps) => {
	if (type === 'slide') {
		const slideOrigin = expansionOrigin ?? { x: window.innerWidth / 2, y: window.innerHeight / 2 };

		// define o ponto de origem antes da animação
		document.documentElement.style.transformOrigin = `${slideOrigin.x}px ${slideOrigin.y}px`;

		document.documentElement.animate(
			[
				{ opacity: 1, scale: 1, transform: `${directionMap[direction]}(0)` },
				{ opacity: 0.5, scale: 0.9, transform: `${directionMap[direction]}(-100px)` },
			],
			{
				duration: 1000,
				easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
				fill: 'forwards',
				pseudoElement: '::view-transition-old(root)',
			}
		);

		document.documentElement.animate([{ transform: `${directionMap[direction]}(100%)` }, { transform: `${directionMap[direction]}(0)` }], {
			duration: 1000,
			easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
			fill: 'forwards',
			pseudoElement: '::view-transition-new(root)',
		});
	}

	if (type === 'expansable' && expansionOrigin) {
		const { x, y } = expansionOrigin;
		const maxRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

		document.documentElement.animate(
			[{ clipPath: `circle(0px at ${x}px ${y}px)` }, { clipPath: `circle(${maxRadius}px at ${x}px ${y}px)` }],
			{
				duration: 700,
				easing: 'ease-in-out',
				pseudoElement: '::view-transition-new(root)',
			}
		);
	}
};
