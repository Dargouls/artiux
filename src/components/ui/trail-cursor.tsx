// src/components/ui/mouse-trail.tsx

'use client';

import { motion } from 'framer-motion';
import React, { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { SmoothCursorRef } from './smooth-cursor'; // Importe a interface da ref

interface MouseTrailProps {
	lineColor?: string;
	lineThickness?: number;
	dashArray?: string;
	maxTrailLength?: number;
	fadeDuration?: number;
	segmentLength?: number;
	// Nova prop: ref para o SmoothCursor
	smoothCursorRef: RefObject<SmoothCursorRef>;
}

const MouseTrail: React.FC<MouseTrailProps> = ({
	lineColor = '#00ffff',
	lineThickness = 2,
	dashArray = '10 5',
	maxTrailLength = 30,
	fadeDuration = 500,
	segmentLength = 5,
	smoothCursorRef, // Consumindo a nova prop
}) => {
	const points = useRef<{ x: number; y: number; timestamp: number }[]>([]);
	const svgRef = useRef<SVGSVGElement>(null);
	const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });
	const [segments, setSegments] = useState<
		{ id: string; x1: number; y1: number; x2: number; y2: number; opacity: number; timestamp: number }[]
	>([]);

	const animationFrameId = useRef<number | null>(null);

	const updateSVGDimensions = useCallback(() => {
		if (svgRef.current) {
			const { clientWidth, clientHeight } = svgRef.current;
			setSvgDimensions({ width: clientWidth, height: clientHeight });
		}
	}, []);

	useEffect(() => {
		updateSVGDimensions();
		window.addEventListener('resize', updateSVGDimensions);
		return () => window.removeEventListener('resize', updateSVGDimensions);
	}, [updateSVGDimensions]);

	// Função para adicionar pontos baseada na posição do SmoothCursor
	const addSmoothCursorPoint = useCallback(() => {
		if (smoothCursorRef.current && svgRef.current) {
			const svgRect = svgRef.current.getBoundingClientRect();
			// Pega a posição do SmoothCursor (que é o centro do cursor)
			const cursorX = smoothCursorRef.current.getX();
			const cursorY = smoothCursorRef.current.getY();

			// Ajusta para ser relativo ao SVG
			const x = cursorX - svgRect.left;
			const y = cursorY - svgRect.top;

			points.current.push({ x, y, timestamp: performance.now() });
		}
	}, [smoothCursorRef]);

	const updateSegments = useCallback(() => {
		// --- NOVIDADE: Adicionar ponto do cursor suave a cada frame de animação ---
		addSmoothCursorPoint();
		// --- FIM DA NOVIDADE ---

		const now = performance.now();
		const newSegments: typeof segments = [];

		if (points.current.length > 1) {
			let currentSegmentStart = points.current[0];
			let distanceSinceLastSegment = 0;

			for (let i = 1; i < points.current.length; i++) {
				const p2 = points.current[i];
				const dx = p2.x - currentSegmentStart.x;
				const dy = p2.y - currentSegmentStart.x; // ERRO AQUI: Era p2.y - currentSegmentStart.y
				const segmentDist = Math.sqrt(dx * dx + dy * dy);

				distanceSinceLastSegment += segmentDist;

				if (distanceSinceLastSegment >= segmentLength || i === points.current.length - 1) {
					const id = `${currentSegmentStart.timestamp}-${p2.timestamp}`;
					const opacity = Math.max(0, 1 - (now - currentSegmentStart.timestamp) / fadeDuration);

					newSegments.push({
						id,
						x1: currentSegmentStart.x,
						y1: currentSegmentStart.y,
						x2: p2.x,
						y2: p2.y,
						opacity,
						timestamp: currentSegmentStart.timestamp,
					});

					currentSegmentStart = p2;
					distanceSinceLastSegment = 0;
				}
			}
		}

		const activeSegments = newSegments.filter((seg) => seg.opacity > 0);
		setSegments(activeSegments);

		const oldestAllowedTime = now - fadeDuration * 1.5;
		while (points.current.length > 0 && points.current[0].timestamp < oldestAllowedTime) {
			points.current.shift();
		}
		while (points.current.length > maxTrailLength) {
			points.current.shift();
		}

		animationFrameId.current = requestAnimationFrame(updateSegments);
	}, [fadeDuration, maxTrailLength, segmentLength, addSmoothCursorPoint]);

	// O listener de mouse direto no documento foi removido pois agora dependemos da ref do cursor.
	// O useEffect para iniciar/limpar o requestAnimationFrame permanece.
	useEffect(() => {
		// Limpa o rastro quando a ref do cursor muda
		points.current = [];
		setSegments([]);

		// Inicia a animação (que agora pega a posição do smooth cursor)
		animationFrameId.current = requestAnimationFrame(updateSegments);

		return () => {
			if (animationFrameId.current) {
				cancelAnimationFrame(animationFrameId.current);
			}
		};
	}, [updateSegments, smoothCursorRef]); // Depende da ref do cursor agora

	return (
		<div className='pointer-events-none fixed inset-0 z-[9999]' style={{ overflow: 'hidden' }}>
			<svg
				ref={svgRef}
				width='100%'
				height='100%'
				viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
				preserveAspectRatio='none'
				// Não há onMouseMove aqui, pois a posição vem do SmoothCursor
			>
				{segments.map((seg) => (
					<motion.line
						key={seg.id}
						x1={seg.x1}
						y1={seg.y1}
						x2={seg.x2}
						y2={seg.y2}
						stroke={lineColor}
						strokeWidth={lineThickness}
						strokeLinecap='round'
						strokeLinejoin='round'
						style={{
							strokeDasharray: dashArray,
							opacity: seg.opacity,
						}}
						initial={{ opacity: 0 }}
						animate={{ opacity: seg.opacity }}
						transition={{ duration: 0.05, ease: 'linear' }}
					/>
				))}
			</svg>
		</div>
	);
};

export default MouseTrail;
