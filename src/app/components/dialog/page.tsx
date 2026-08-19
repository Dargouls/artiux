'use client';

import { Button } from '@/artiux-components/button';
import Dialog from '@/artiux-components/dialog';
import CopyCode from '@/components/copyCode/copyCode';
import { ControlSwitch, Customize } from '@/components/customize/customize';
import { PropsTable } from '@/components/customize/propsTable';
import PreviewCode from '@/components/previewCode/previewCode';
import { useState } from 'react';

export default function DialogComponent() {
	const [open, setOpen] = useState(false);
	const [closeButton, setCloseButton] = useState(false);

	const props = [closeButton ? 'closeButton' : null].filter(Boolean).join(' ');

	const codePreview = `
const [open, setOpen] = useState(false);

<Button className='w-max' onClick={() => setOpen(true)}>
	Mostrar Dialog
</Button>
<Dialog open={open} onClose={() => setOpen(false)}${props ? ` ${props}` : ''}>
	<Dialog.Header>
		<Dialog.Title>Titulo</Dialog.Title>
	</Dialog.Header>
	<Dialog.Body>
		<p>Corpo do Dialog</p>
	</Dialog.Body>
	<Dialog.Footer>
		<Button onClick={() => setOpen(false)}>Fechar</Button>
	</Dialog.Footer>
</Dialog>
					`;

	return (
		<>
			<div>
				<h1 className='mt-20 text-5xl font-bold'>Dialog</h1>
				<p className='text-muted-foreground mt-4 block text-xl'>Um Dialog com animação de expansão</p>
			</div>

			<section className='my-8'>
				<h3 className='text-2xl font-bold'>Código:</h3>
				<div className='mt-4 h-52 place-content-start'>
					<CopyCode installs='yarn add motion lucide-react' code={dialogCode} />
				</div>
			</section>

			<section className='my-8'>
				<PreviewCode code={codePreview}>
					<Button className='w-max' onClick={() => setOpen(true)}>
						Mostrar Dialog
					</Button>
					<Dialog open={open} onClose={() => setOpen(false)} closeButton={closeButton}>
						<Dialog.Header>
							<Dialog.Title>Titulo</Dialog.Title>
						</Dialog.Header>
						<Dialog.Body>
							<p>Corpo do Dialog</p>
						</Dialog.Body>
						<Dialog.Footer>
							<Button onClick={() => setOpen(false)}>Fechar</Button>
						</Dialog.Footer>
					</Dialog>
				</PreviewCode>
			</section>

			<section className='my-8'>
				<Customize>
					<ControlSwitch label='Aberto' checked={open} onChange={setOpen} />
					<ControlSwitch label='Botão fechar' checked={closeButton} onChange={setCloseButton} />
				</Customize>
			</section>

			<section className='my-8'>
				<PropsTable rows={propRows} />
			</section>
		</>
	);
}

const propRows = [
	{ property: 'open', type: 'boolean', description: 'Controla se o dialog está visível.' },
	{ property: 'onClose', type: '() => void', description: 'Chamado ao clicar fora do dialog para fechá-lo.' },
	{ property: 'closeButton', type: 'boolean', default: 'false', description: 'Exibe um botão de fechar no canto superior direito.' },
	{ property: 'Dialog.Header', type: 'React.HTMLAttributes<HTMLDivElement>', description: 'Container do cabeçalho do dialog.' },
	{ property: 'Dialog.Title', type: 'React.HTMLAttributes<HTMLHeadingElement>', description: 'Título do dialog.' },
	{ property: 'Dialog.Body', type: 'React.HTMLAttributes<HTMLDivElement>', description: 'Container do corpo/conteúdo do dialog.' },
	{ property: 'Dialog.Footer', type: 'React.HTMLAttributes<HTMLDivElement>', description: 'Container do rodapé, geralmente com ações.' },
];

const dialogCode = `
'use client';

import { forwardRef, useEffect, useRef } from 'react';

import { useOutsideClick } from '@/hook/useOutsideClick';
import { cn } from '@/lib/utils';

import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
	open: boolean;
	onClose: () => void;
	closeButton?: boolean;
}

export default function Dialog({ closeButton, open, onClose, children, ...props }: DialogProps) {
	const modalRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
	useOutsideClick(modalRef, () => onClose());

	useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [open]);

	return (
		<>
			{open && (
				<div className='fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/30 p-4 transition-all'>
					<AnimatePresence>
						{open && (
							<Wrapper
								ref={modalRef}
								className='bg-card text-card-foreground border-border relative w-full max-w-lg rounded-lg border p-4 shadow-2xl'
							>
								{closeButton && (
									<div className='text-foreground absolute right-4 top-4 cursor-pointer rounded-full p-1 transition-colors'>
										<X size={16} onClick={onClose} />
									</div>
								)}

								{children}
							</Wrapper>
						)}
					</AnimatePresence>
				</div>
			)}
		</>
	);
}

const Title = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<h3 className='text-lg font-semibold leading-none tracking-tight'>{children}</h3>
		</>
	);
};

const Header = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<div className='flex items-center pb-4'>{children}</div>
		</>
	);
};

const Body = ({ children }: { children: React.ReactNode }) => {
	return <div className='block py-2'>{children}</div>;
};

const Footer = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<div className='flex items-center justify-end pt-4'>{children}</div>
		</>
	);
};

Dialog.Header = Header;
Dialog.Title = Title;
Dialog.Body = Body;
Dialog.Footer = Footer;

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const Wrapper = forwardRef<HTMLDivElement, ContainerProps>(({ children, ...props }, ref) => {
	return (
		<>
			<motion.div
				ref={ref}
				className={cn('', props.className)}
				initial={{ opacity: 0.3, scaleX: 0.9, scaleY: 0.2 }}
				viewport={{ once: true }}
				animate={{ opacity: 1, scaleX: 1, scaleY: 1 }}
				exit={{ opacity: 0.3, scaleX: 0.9, scaleY: 0.5 }}
				transition={{
					type: 'spring',
					bounce: 0.4,
					duration: 0.5,
				}}
			>
				{children}
			</motion.div>
		</>
	);
});
`;
