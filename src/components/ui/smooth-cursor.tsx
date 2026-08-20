// src/components/ui/smooth-cursor.tsx (Seu arquivo SmoothCursor existente)

'use client';

import { motion, useSpring } from 'motion/react'; // Importe MotionValue
import { FC, forwardRef, JSX, useEffect, useImperativeHandle, useRef, useState } from 'react'; // Importe forwardRef e useImperativeHandle

interface Position {
	x: number;
	y: number;
}

export interface SmoothCursorRef {
	getX: () => number;
	getY: () => number;
	// Opcional: para saber se o cursor está em um elemento clicável
	isPointer: () => boolean;
	hasMoved: () => boolean;
}

export interface SmoothCursorProps {
	cursor?: JSX.Element;
	springConfig?: {
		damping: number;
		stiffness: number;
		mass: number;
		restDelta: number;
	};
}

const PointerCursorSVG: FC = () => {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
			<path
				fill='white'
				stroke='white'
				strokeLinejoin='round'
				strokeLinecap='round'
				strokeWidth='2'
				d='M11.5 22C4.7 22 3 16.333 3 13.5V10c0-.333.2-1 1-1s1 .667 1 1v2c0 .5.3 1.5 1.5 1.5S8 12.5 8 12V3c0-.333.2-1 1-1s1 .667 1 1v7c.5.5.8 1.2 2 0V8c0-.333.2-1 1-1s1 .667 1 1v1h1c0-.333.2-1 1-1s1 .667 1 1v1h1c0-.333.2-1 1-1s1 .667 1 1v3.5c0 2.833-1.7 8.5-8.5 8.5'
			/>
		</svg>
	);
};

const DefaultCursorSVG: FC = () => {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' width={50} height={54} viewBox='0 0 50 54' fill='none' style={{ scale: 0.5 }}>
			<g filter='url(#filter0_d_91_7928)'>
				<path
					d='M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z'
					fill='white'
				/>
				<path
					d='M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z'
					stroke='black'
					strokeWidth={2.25825}
				/>
			</g>
			<defs>
				<filter
					id='filter0_d_91_7928'
					x={0.602397}
					y={0.952444}
					width={49.0584}
					height={52.428}
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood floodOpacity={0} result='BackgroundImageFix' />
					<feColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha' />
					<feOffset dy={2.25825} />
					<feGaussianBlur stdDeviation={2.25825} />
					<feComposite in2='hardAlpha' operator='out' />
					<feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0' />
					<feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_91_7928' />
					<feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_91_7928' result='shape' />
				</filter>
			</defs>
		</svg>
	);
};

// Use forwardRef para que o componente possa receber uma ref
export const SmoothCursor = forwardRef<SmoothCursorRef, SmoothCursorProps>(
	(
		{
			springConfig = {
				damping: 45,
				stiffness: 400,
				mass: 1.5,
				restDelta: 0.01,
			},
		},
		ref
	) => {
		// 'ref' é o que será exposto externamente
		const [isMoving, setIsMoving] = useState(false);
		const [isPointer, setIsPointer] = useState(false);
		const lastMousePos = useRef<Position>({ x: 0, y: 0 });
		const velocity = useRef<Position>({ x: 0, y: 0 });
		const hasMoved = useRef(false);
		const lastUpdateTime = useRef(Date.now());
		const previousAngle = useRef(0);
		const accumulatedRotation = useRef(0);

		const cursor = isPointer ? <PointerCursorSVG /> : <DefaultCursorSVG />;
		const cursorX = useSpring(0, springConfig);
		const cursorY = useSpring(0, springConfig);
		const rotation = useSpring(0, {
			...springConfig,
			damping: 60,
			stiffness: 300,
		});
		const scale = useSpring(1, {
			...springConfig,
			stiffness: 500,
			damping: 35,
		});

		// --- NOVIDADE: Expõe os valores suavizados via ref ---
		useImperativeHandle(ref, () => ({
			// Retorna a posição atual dos MotionValues
			getX: () => cursorX.get(),
			getY: () => cursorY.get(),
			isPointer: () => isPointer, // Se você precisar saber o estado do ponteiro
			hasMoved: () => hasMoved.current,
		}));
		// --- FIM DA NOVIDADE ---

		useEffect(() => {
			const clickableSelector = 'a, button, [role="button"], input[type="button"], input[type="submit"], label, [onclick]';

			const prevCursor = document.body.style.cursor;
			document.body.style.cursor = 'none';

			const styleEl = document.createElement('style');
			styleEl.textContent = '*{cursor:none!important}';
			document.head.appendChild(styleEl);

			let rafId = 0;
			let timeoutId: ReturnType<typeof setTimeout> | null = null;

			const updateVelocity = (pos: Position) => {
				const now = Date.now();
				const dt = now - lastUpdateTime.current;
				if (dt > 0) {
					velocity.current = {
						x: (pos.x - lastMousePos.current.x) / dt,
						y: (pos.y - lastMousePos.current.y) / dt,
					};
				}
				lastUpdateTime.current = now;
				lastMousePos.current = pos;
			};

			const smoothPointerMove = (e: PointerEvent) => {
				const pos = { x: e.clientX, y: e.clientY };
				updateVelocity(pos);

				if (!hasMoved.current) {
					hasMoved.current = true;
					lastMousePos.current = pos;
					cursorX.jump(pos.x);
					cursorY.jump(pos.y);
				} else {
					cursorX.set(pos.x);
					cursorY.set(pos.y);
				}

				const speed = Math.hypot(velocity.current.x, velocity.current.y);
				if (speed > 0.1) {
					const angle = Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) + 90;
					let diff = angle - previousAngle.current;
					if (diff > 180) diff -= 360;
					if (diff < -180) diff += 360;
					accumulatedRotation.current += diff;
					rotation.set(accumulatedRotation.current);
					previousAngle.current = angle;

					scale.set(0.95);
					if (timeoutId !== null) clearTimeout(timeoutId);
					timeoutId = setTimeout(() => scale.set(1), 150);
				}
			};

			const throttledPointerMove = (e: PointerEvent) => {
				if (rafId) return;
				rafId = requestAnimationFrame(() => {
					smoothPointerMove(e);
					rafId = 0;
				});
			};

			// Detecta hover em elementos clicáveis via delegação, sem elementFromPoint
			// (elementFromPoint força reflow síncrono a cada chamada).
			const onOver = (e: PointerEvent) => {
				const target = e.target as HTMLElement | null;
				setIsPointer(!!target?.closest(clickableSelector));
			};
			const onOut = (e: PointerEvent) => {
				const related = e.relatedTarget as HTMLElement | null;
				if (!related?.closest(clickableSelector)) setIsPointer(false);
			};

			window.addEventListener('pointermove', throttledPointerMove, { passive: true });
			window.addEventListener('pointerover', onOver, { passive: true });
			window.addEventListener('pointerout', onOut, { passive: true });

			return () => {
				window.removeEventListener('pointermove', throttledPointerMove);
				window.removeEventListener('pointerover', onOver);
				window.removeEventListener('pointerout', onOut);
				if (rafId) cancelAnimationFrame(rafId);
				if (timeoutId !== null) clearTimeout(timeoutId);
				document.body.style.cursor = prevCursor;
				styleEl.remove();
			};
		}, [cursorX, cursorY, rotation, scale]);

		return (
			<motion.div
				style={{
					position: 'fixed',
					left: 0,
					top: 0,
					x: cursorX,
					y: cursorY,
					translateX: '-50%',
					translateY: '-50%',
					rotate: rotation,
					scale: scale,
					zIndex: 9999,
					pointerEvents: 'none',
					willChange: 'transform',
				}}
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{
					type: 'spring',
					stiffness: 400,
					damping: 10,
				}}
			>
				{cursor}
			</motion.div>
		);
	}
);

// Adicionar um displayName é boa prática para forwardRef
SmoothCursor.displayName = 'SmoothCursor';
