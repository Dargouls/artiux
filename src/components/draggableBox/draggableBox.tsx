import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

// Registra o plugin Draggable
gsap.registerPlugin(Draggable);

interface DraggableBoxProps {
	children: ReactNode;
	className?: string;
	style?: React.CSSProperties;
}

const DraggableBox: React.FC<DraggableBoxProps> = ({ children, className, style }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const draggableInstances = useRef<Draggable[]>([]);
	const [draggingElement, setDraggingElement] = useState<HTMLElement | null>(null);

	useEffect(() => {
		// Verifica se está no cliente (Next.js)
		if (typeof window === 'undefined') {
			return;
		}

		// Limpa instâncias anteriores
		draggableInstances.current.forEach((instance) => instance.kill());
		draggableInstances.current = [];

		// Usa um timeout para garantir que o layout esteja completo
		const timeoutId = setTimeout(() => {
			if (containerRef.current) {
				// Força o container a ter altura definida se necessário
				const container = containerRef.current;
				const containerRect = container.getBoundingClientRect();

				// Garante que o container tenha dimensões mínimas
				if (containerRect.height === 0) {
					gsap.set(container, { minHeight: '400px' });
				}

				// Encontra todos os elementos filhos diretos
				const childElements = Array.from(container.children) as HTMLElement[];

				childElements.forEach((element, index) => {
					// Aplica estilos necessários para o drag
					gsap.set(element, {
						position: 'absolute',
						cursor: 'grab',
						zIndex: 1,
						// Define posições iniciais se não estiverem definidas
						x: Math.min(index * 50, container.offsetWidth - element.offsetWidth - 20),
						y: Math.min(index * 50, container.offsetHeight - element.offsetHeight - 20),
					});

					// Aguarda um frame para garantir que as dimensões estejam atualizadas
					requestAnimationFrame(() => {
						// Cria instância Draggable para cada elemento
						const draggableInstance = Draggable.create(element, {
							bounds: {
								minX: 0,
								minY: 0,
								maxX: Math.max(0, container.offsetWidth - element.offsetWidth),
								maxY: Math.max(0, container.offsetHeight - element.offsetHeight),
							},
							inertia: true,
							onDragStart: function () {
								gsap.to(this.target, {
									zIndex: 10,
									scale: 1.05,
									boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
									duration: 0.2,
								});
								gsap.set(this.target, { cursor: 'grabbing' });
								setDraggingElement(this.target as HTMLElement);
							},
							onDragEnd: function () {
								gsap.to(this.target, {
									zIndex: 1,
									scale: 1,
									boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
									duration: 0.2,
								});
								gsap.set(this.target, { cursor: 'grab' });
								setDraggingElement(null);
							},
							onDrag: function () {
								// Adiciona rotação sutil durante o drag
								gsap.to(this.target, {
									rotation: (this.deltaX + this.deltaY) * 0.01,
									duration: 0.1,
									overwrite: true,
								});
							},
							onRelease: function () {
								// Remove a rotação quando soltar
								gsap.to(this.target, {
									rotation: 0,
									duration: 0.3,
									ease: 'power2.out',
								});
							},
						});

						// Adiciona as instâncias ao array (Draggable.create sempre retorna array)
						if (Array.isArray(draggableInstance)) {
							draggableInstances.current.push(...draggableInstance);
						}
					});
				});
			}
		}, 100);

		// Cleanup function
		return () => {
			clearTimeout(timeoutId);
			draggableInstances.current.forEach((instance) => instance.kill());
			draggableInstances.current = [];
		};
	}, [children]); // Recria quando children mudam

	return (
		<div
			ref={containerRef}
			className={className}
			style={{
				position: 'relative',
				overflow: 'hidden',
				...style,
			}}
		>
			{children}
		</div>
	);
};

export default DraggableBox;
