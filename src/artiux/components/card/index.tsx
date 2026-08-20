import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';
import { RippleContainer } from '../rippleContainer';
import { textVariants } from '../text';

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
		<div {...props} className={cn(`flex flex-col gap-2`, props.className)}>
			{children}
		</div>
	);
}
