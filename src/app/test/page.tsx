'use client';

import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer, GodRays } from '@react-three/postprocessing';
import { useRef } from 'react';

import * as THREE from 'three';

export default function Test() {
	return (
		<div className='fixed bottom-0 left-0 right-0 top-0'>
			<Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
				<Compin />
			</Canvas>
		</div>
	);
}

const Compin = () => {
	const lightRef = useRef<THREE.Mesh>(null!);

	useFrame((_, delta) => {
		if (lightRef.current) {
			// Gira no eixo Y suavemente
			lightRef.current.rotation.y += 0.2 * delta; // 1 radiano por segundo
		}
	});

	return (
		<>
			{/* Luz ambiente e de preenchimento */}
			<ambientLight intensity={0.05} />
			<directionalLight position={[0, 0, 0]} intensity={0.2} />

			{/* Objeto iluminado (por exemplo, uma esfera acima da fonte de luz) */}
			{/* <Float rotation={[0, 0, 10]} floatIntensity={3} speed={5}>
					<CubeCamera position={[0, 0, 0.5]} resolution={256} frames={Infinity}>
						{(texture) => (
							<mesh>
								<sphereGeometry args={[0.2, 32, 32]} />
								<meshStandardMaterial metalness={1} roughness={0.1} envMap={texture} />
							</mesh>
						)}
					</CubeCamera>
				</Float> */}

			{/* Luz fonte (sol que gera os raios) */}
			<mesh ref={lightRef} position={[0, 0, 0]}>
				<sphereGeometry args={[0.2, 16, 16]} />
				<meshBasicMaterial color='white' />
			</mesh>

			{/* Efeitos de pós-processamento */}
			<EffectComposer>
				<GodRays
					sun={lightRef}
					samples={30}
					density={0.9}
					decay={0.8}
					weight={1}
					exposure={0.34}
					clampMax={1}
					blur
				/>
				<Bloom
				//  luminanceThreshold={0} mipmapBlur luminanceSmoothing={0.0} intensity={1}
				/>
			</EffectComposer>

			<OrbitControls />
		</>
	);
};
