'use client';

import { cn } from '@/lib/utils';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform, useVelocity, type MotionValue } from 'motion/react';
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';
import * as React from 'react';

type DotPosition = { x: number; y: number };

function LiquidBlob({ x, y }: { x: MotionValue<number>; y: MotionValue<number> }) {
	const vx = useVelocity(x);
	const vy = useVelocity(y);
	const rotate = useTransform([vx, vy], ([a, b]: number[]) => (Math.atan2(b, a) * 180) / Math.PI);
	const negRotate = useTransform(rotate, (r) => -r);
	const speed = useTransform([vx, vy], ([a, b]: number[]) => Math.min(Math.hypot(a, b), 2000));
	const stretch = useTransform(speed, [0, 400], [1, 1.7]);
	const squish = useTransform(speed, [0, 400], [1, 0.35]);
	const transform = useMotionTemplate`translate(-50%, -50%) rotate(${rotate}deg) scaleX(${stretch}) scaleY(${squish}) rotate(${negRotate}deg)`;

	return (
		<motion.div className='absolute left-0 top-0' style={{ x, y }}>
			<motion.div className='bg-primary size-5 rounded-full' style={{ transform }} />
		</motion.div>
	);
}

const RadioGroupContext = React.createContext<{
	registerItem: (value: string, node: HTMLButtonElement | null) => void;
} | null>(null);

export type RadioGroupProps = React.ComponentProps<typeof RadioGroupPrimitive.Root>;
function RadioGroup({ className, value, defaultValue, onValueChange, children, ...props }: RadioGroupProps) {
	const [internalValue, setInternalValue] = React.useState(value ?? defaultValue);
	const currentValue = value !== undefined ? value : internalValue;

	const gooId = React.useId();
	const containerRef = React.useRef<HTMLDivElement>(null);
	const itemsRef = React.useRef(new Map<string, HTMLButtonElement>());
	const [dot, setDot] = React.useState<DotPosition | null>(null);

	const targetX = useMotionValue(0);
	const targetY = useMotionValue(0);
	const leadX = useSpring(targetX, { stiffness: 500, damping: 30, mass: 0.6 });
	const leadY = useSpring(targetY, { stiffness: 500, damping: 30, mass: 0.6 });
	const lagX = useSpring(targetX, { stiffness: 170, damping: 24, mass: 1 });
	const lagY = useSpring(targetY, { stiffness: 170, damping: 24, mass: 1 });

	const updateDot = React.useCallback(() => {
		const container = containerRef.current;
		const item = currentValue ? itemsRef.current.get(currentValue) : null;
		if (!container || !item) {
			setDot(null);
			return;
		}
		const containerRect = container.getBoundingClientRect();
		const itemRect = item.getBoundingClientRect();
		setDot({
			x: itemRect.left - containerRect.left + itemRect.width / 2,
			y: itemRect.top - containerRect.top + itemRect.height / 2,
		});
	}, [currentValue]);

	React.useLayoutEffect(() => {
		updateDot();
	}, [updateDot]);

	React.useEffect(() => {
		if (!dot) return;
		targetX.set(dot.x);
		targetY.set(dot.y);
	}, [dot, targetX, targetY]);

	React.useEffect(() => {
		const onResize = () => updateDot();
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, [updateDot]);

	const registerItem = React.useCallback((itemValue: string, node: HTMLButtonElement | null) => {
		if (node) itemsRef.current.set(itemValue, node);
		else itemsRef.current.delete(itemValue);
	}, []);

	const contextValue = React.useMemo(() => ({ registerItem }), [registerItem]);

	return (
		<RadioGroupContext.Provider value={contextValue}>
			<RadioGroupPrimitive.Root
				ref={containerRef}
				data-slot='radio-group'
				value={value}
				defaultValue={defaultValue}
				onValueChange={(v) => {
					setInternalValue(v);
					onValueChange?.(v);
				}}
				className={cn('relative grid gap-3', className)}
				{...props}
			>
				{children}
				{dot && (
					<div className='pointer-events-none absolute inset-0 z-10' style={{ filter: `url(#${gooId})` }}>
						<svg width='0' height='0' className='absolute'>
							<defs>
								<filter id={gooId}>
									<feGaussianBlur in='SourceGraphic' stdDeviation='6' result='blur' />
									<feColorMatrix in='blur' mode='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -7' result='goo' />
								</filter>
							</defs>
						</svg>
						<LiquidBlob x={lagX} y={lagY} />
						<LiquidBlob x={leadX} y={leadY} />
					</div>
				)}
			</RadioGroupPrimitive.Root>
		</RadioGroupContext.Provider>
	);
}

export type RadioGroupItemProps = React.ComponentProps<typeof RadioGroupPrimitive.Item>;
function RadioGroupItem({ className, value, ...props }: RadioGroupItemProps) {
	const context = React.useContext(RadioGroupContext);

	const refCallback = React.useCallback(
		(node: HTMLButtonElement | null) => {
			context?.registerItem(value, node);
		},
		[context, value]
	);

	return (
		<RadioGroupPrimitive.Item
			ref={refCallback}
			value={value}
			data-slot='radio-group-item'
			className={cn(
				'border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 shadow-xs aspect-square size-6 shrink-0 rounded-full border outline-none transition-[color,box-shadow,border-color] duration-200 ease-in-out focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
				'data-[state=checked]:border-primary',
				className
			)}
			{...props}
		/>
	);
}

export { RadioGroup, RadioGroupItem };
