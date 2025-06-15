// components/BubbleParticles.tsx
'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface BubbleData {
	position: THREE.Vector3;
	velocity: THREE.Vector3;
	life: number; // tempo de vida (0-1)
	maxLife: number; // tempo máximo de vida
	size: number; // tamanho da bolha
	oscillation: number; // fase de oscilação
}

// Componente interno que usa os hooks do R3F
function BubbleSystem({ count = 50 }: { count?: number }) {
	const meshRef = useRef<THREE.InstancedMesh>(null);

	// 1) Cria dados iniciais das bolhas
	const bubbles = useMemo(() => {
		const bubbleArray: BubbleData[] = [];

		for (let i = 0; i < count; i++) {
			bubbleArray.push({
				position: new THREE.Vector3(
					(Math.random() - 0.5) * 100, // posição X aleatória
					-10 + Math.random() * -20, // começa abaixo da superfície
					(Math.random() - 0.5) * 100 // posição Z aleatória
				),
				velocity: new THREE.Vector3(
					(Math.random() - 0.5) * 0.5, // movimento lateral aleatório
					0.5 + Math.random() * 1.5, // velocidade ascendente
					(Math.random() - 0.5) * 0.5 // movimento em profundidade
				),
				life: Math.random(), // vida inicial aleatória
				maxLife: 8 + Math.random() * 12, // 8-20 segundos de vida
				size: 0.3 + Math.random() * 1.2, // tamanho entre 0.3 e 1.5
				oscillation: Math.random() * Math.PI * 2, // fase de oscilação
			});
		}

		return bubbleArray;
	}, [count]);

	// 2) Animação das bolhas
	useFrame(({ clock }, delta) => {
		if (!meshRef.current) return;

		const time = clock.elapsedTime;
		const dummy = new THREE.Object3D();

		bubbles.forEach((bubble, i) => {
			// Atualiza vida da bolha
			bubble.life += delta / bubble.maxLife;

			// Se a bolha "morreu", reseta para nova posição
			if (bubble.life >= 1.0) {
				bubble.position.set(
					(Math.random() - 0.5) * 100,
					-10 + Math.random() * -20,
					(Math.random() - 0.5) * 100
				);
				bubble.velocity.set(
					(Math.random() - 0.5) * 0.5,
					0.5 + Math.random() * 1.5,
					(Math.random() - 0.5) * 0.5
				);
				bubble.life = 0;
				bubble.maxLife = 8 + Math.random() * 12;
				bubble.size = 0.3 + Math.random() * 1.2;
				bubble.oscillation = Math.random() * Math.PI * 2;
			}

			// 3) Movement com oscilação lateral
			const oscillationX = Math.sin(time * 0.8 + bubble.oscillation) * 0.3;
			const oscillationZ = Math.cos(time * 0.6 + bubble.oscillation * 1.3) * 0.2;

			bubble.position.x += bubble.velocity.x * delta + oscillationX * delta;
			bubble.position.y += bubble.velocity.y * delta;
			bubble.position.z += bubble.velocity.z * delta + oscillationZ * delta;

			// 4) Calcula opacity baseada na vida (fade in/out)
			let opacity = 1.0;
			if (bubble.life < 0.1) {
				// Fade in nos primeiros 10% da vida
				opacity = bubble.life / 0.1;
			} else if (bubble.life > 0.7) {
				// Fade out nos últimos 30% da vida
				opacity = (1.0 - bubble.life) / 0.3;
			}
			opacity = Math.max(0, Math.min(1, opacity));

			// 5) Calcula escala baseada na vida (cresce e diminui)
			const lifeScale = Math.sin(bubble.life * Math.PI) * 0.8 + 0.2;
			const finalScale = bubble.size * lifeScale;

			// 6) Aplica transformação na instância
			dummy.position.copy(bubble.position);
			dummy.scale.setScalar(finalScale);
			dummy.updateMatrix();

			meshRef.current.setMatrixAt(i, dummy.matrix);

			// Define cor com opacity (usando instanced attributes seria mais eficiente)
			const color = new THREE.Color().setHSL(0.55 + Math.sin(time + i) * 0.1, 0.6, 0.8);
			meshRef.current.setColorAt(i, color);
		});

		meshRef.current.instanceMatrix.needsUpdate = true;
		if (meshRef.current.instanceColor) {
			meshRef.current.instanceColor.needsUpdate = true;
		}
	});

	return (
		// 7) Mesh instanciado com geometria esférica
		<instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
			<sphereGeometry args={[1, 16, 12]} />
			<meshBasicMaterial
				transparent={true}
				// opacity={0.6}
				color={'#fff'}
				toneMapped={false}
			/>
		</instancedMesh>
	);
}

// Componente principal com seu próprio Canvas
export default function BubbleParticles({ count = 50 }: { count?: number }) {
	return (
		<div className='pointer-events-none fixed inset-0'>
			<Canvas camera={{ position: [0, 2, 12], fov: 60 }} gl={{ antialias: true, alpha: true }}>
				<ambientLight intensity={0.3} />
				<BubbleSystem count={count} />
			</Canvas>
		</div>
	);
}
