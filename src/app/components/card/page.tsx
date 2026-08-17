'use client';

import CopyCode from '@/components/copyCode/copyCode';
import PreviewCode from '@/components/previewCode/previewCode';

import { Button } from '@/artiux-components/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/artiux-components/card';

export default function CardComponent() {
	return (
		<>
			<div>
				<h1 className='mt-20 text-5xl font-bold'>Card</h1>
				<p className='text-muted-foreground mt-4 block text-xl'>Um container para agrupar conteúdo relacionado</p>
			</div>

			<section className='my-8'>
				<h3 className='text-2xl font-bold'>Código:</h3>
				<div className='mt-4 h-52 place-content-start'>
					<CopyCode installs='yarn add class-variance-authority' code={componentCode} />
				</div>
			</section>

			<section className='my-8'>
				<PreviewCode code={previewCode}>
					<Card className='max-w-sm'>
						<CardHeader>
							<CardTitle>Título</CardTitle>
							<CardDescription>Subtítulo</CardDescription>
						</CardHeader>

						<CardContent>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ultricies mi vitae est. Pellentesque habitant morbi
							tristique senectus et netus et malesuada fames ac turpis egestas.
						</CardContent>

						<CardFooter>
							<Button>Continuar</Button>
						</CardFooter>
					</Card>

					<Card ripple className='max-w-sm'>
						<CardHeader>
							<CardTitle>Com ripple</CardTitle>
							<CardDescription>Clique em qualquer área do card</CardDescription>
						</CardHeader>

						<CardContent>Ao passar a prop `ripple`, o card inteiro fica clicável e ganha o efeito de ripple.</CardContent>
					</Card>
				</PreviewCode>
			</section>
		</>
	);
}

const previewCode = `
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/artiux-components/card';

<Card className='max-w-sm'>
	<CardHeader>
		<CardTitle>Título</CardTitle>
		<CardDescription>Subtítulo</CardDescription>
	</CardHeader>

	<CardContent>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit.
	</CardContent>

	<CardFooter>
		<Button>Continuar</Button>
	</CardFooter>
</Card>
`;

const componentCode = `
import { RippleContainer } from '@/components/ui/rippleContainer';
import { textVariants } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';

export interface CardProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	ripple?: boolean;
}
interface CardTitleProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	/**
	 * @prop {boolean} srOnly - Define se o texto deve ser exibido apenas para leitores de tela
	 */
	srOnly?: boolean;
	typography?: VariantProps<typeof textVariants>['typography'];
}

interface CardContentProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export function Card({ title, children, ripple, ...props }: CardProps) {
	return (
		<>
			{ripple ? (
				<RippleContainer>
					<div
						{...props}
						className={cn('bg-card text-card-foreground flex w-full min-w-32 flex-col rounded-3xl p-4 shadow-sm', props.className)}
					>
						{children}
					</div>
				</RippleContainer>
			) : (
				<div
					{...props}
					className={cn('bg-card text-card-foreground flex w-full min-w-32 flex-col gap-4 rounded-3xl p-4 shadow-sm', props.className)}
				>
					{children}
				</div>
			)}
		</>
	);
}

export function CardHeader({ children, ...props }: CardContentProps) {
	return (
		<div {...props} className={cn('flex flex-col', props.className)}>
			{children}
		</div>
	);
}

export function CardTitle({ srOnly, children, ...props }: CardTitleProps) {
	return (
		<div
			{...props}
			className={cn(
				'flex items-center gap-2',
				srOnly && 'sr-only',
				textVariants({ typography: props.typography || 'h4' }),
				props.className
			)}
		>
			{children}
		</div>
	);
}

export function CardDescription({ children, ...props }: CardContentProps) {
	return (
		<div {...props} className={cn('text-emphasis-low', textVariants({ typography: 'description-2' }))}>
			{children}
		</div>
	);
}

export function CardContent({ children, ...props }: CardContentProps) {
	return (
		<div {...props} className={cn('w-full overflow-hidden', props.className)}>
			{children}
		</div>
	);
}

export function CardFooter({ children, ...props }: CardContentProps) {
	return (
		<div {...props} className={cn(\`flex flex-col gap-2\`, props.className)}>
			{children}
		</div>
	);
}
`;
