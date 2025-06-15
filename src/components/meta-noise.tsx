// components/SynthwaveSurface.tsx
'use client';

import { cn } from '@/lib/utils';
import { Canvas, useFrame } from '@react-three/fiber';
import { DepthOfField, EffectComposer } from '@react-three/postprocessing';
import { HTMLAttributes, useMemo, useRef } from 'react';
import { createNoise2D } from 'simplex-noise';
import * as THREE from 'three';

function DeformingPlane({ height = 0.3, y = -1 }: { height: number; y: number }) {
	const meshRef = useRef<THREE.Mesh>(null);
	const noise2D = useMemo(() => createNoise2D(), []);
	const cols = 80;
	const rows = 80;
	const size = 150;

	// 1) Cria a geometria subdividida
	const geometry = useMemo(() => {
		return new THREE.PlaneGeometry(size, size, cols, rows).rotateX(-Math.PI / 1.1); // deixa no eixo XZ
	}, [cols, rows, size]);

	// 2) Animação: deforma o plano a cada frame
	useFrame(({ clock }) => {
		const t = clock.elapsedTime * 0.1;
		const pos = geometry.attributes.position as THREE.BufferAttribute;
		const arr = pos.array as Float32Array;

		// percorre todos os vértices (cada 3 valores = x,y,z)
		for (let i = 0; i < arr.length; i += 3) {
			const x = arr[i];
			const z = arr[i + 2];

			// fBm simples: soma de 4 octaves
			let v = 0,
				amp = 1,
				freq = 1;
			for (let octave = 0; octave < 4; octave++) {
				v += amp * noise2D(x * 0.1 * freq + t, z * 0.1 * freq + t);
				freq *= 2;
				amp *= 0.5;
			}
			arr[i + 1] = v * height; // ajusta a "altura"
		}

		pos.needsUpdate = true;
		geometry.computeVertexNormals(); // atualiza normais pra iluminação se precisar
	});

	return (
		<>
			{/* 3) Mesh principal com material wireframe neon */}
			<mesh ref={meshRef} geometry={geometry} position={[0, y, 0]}>
				<meshBasicMaterial
					color={'#fff'}
					wireframe={true}
					transparent={true}
					opacity={0.4}
					toneMapped={false}
				/>
			</mesh>

			{/* 4) Malha preta sólida abaixo para mascarar as ondas em profundidade */}
			<mesh position={[0, -2, 0]}>
				<planeGeometry args={[size * 2, size * 2]} />
				<meshBasicMaterial color={'#000000'} side={THREE.DoubleSide} transparent={false} />
			</mesh>
		</>
	);
}

interface NoiseSurfaceProps extends HTMLAttributes<HTMLDivElement> {
	height?: number;
	y?: number;
}

export default function NoiseSurface({ height = 0.3, y = -1, ...props }: NoiseSurfaceProps) {
	return (
		<div className={cn('inset-0 -z-10 bg-transparent', props.className)}>
			<Canvas camera={{ position: [0, 0, 12], fov: 40 }} gl={{ antialias: true }}>
				<ambientLight intensity={0.2} />
				<directionalLight position={[5, 10, 5]} intensity={1} />
				<DeformingPlane height={height} y={y} />

				{/* 5) Efeitos de pós-processamento para blur baseado em profundidade */}
				<EffectComposer>
					<DepthOfField
						focusDistance={0} // distância do foco (0 = câmera, 1 = longe)
						focalLength={0.05} // comprimento focal (menor = mais blur)
						bokehScale={8} // intensidade do bokeh/blur
						height={720} // resolução do efeito
					/>
				</EffectComposer>
			</Canvas>
		</div>
	);
}
