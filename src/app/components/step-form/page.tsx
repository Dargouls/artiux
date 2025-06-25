'use client';

import CopyCode from '@/components/copyCode/copyCode';

import AnimatedForm from '@/components/animatedForm/animatedForm';
import PreviewCode from '@/components/previewCode/previewCode';

export default function StepFormComponent() {
	return (
		<>
			<div>
				<h1 className='mt-20 text-5xl font-bold'>Step Form</h1>
				<p className='text-muted-foreground mt-4 block text-xl'>
					Um provider de formulário com animação passo-a-passo
				</p>
			</div>

			<section className='my-8'>
				<h3 className='text-2xl font-bold'>Código:</h3>
				<div className='mt-4 h-52 place-content-start'>
					<CopyCode installs='yarn add motion' code={componentCode} />
				</div>
			</section>

			<section className='my-8'>
				<PreviewCode code={previewCode}>
					<div className='w-max min-w-96'>
						<AnimatedForm />
					</div>
				</PreviewCode>
			</section>
		</>
	);
}

const previewCode = `
// Instalações
// yarn add react-hook-form @hookform/resolvers zod lucide-react react-hot-toast

'use client';

import StepFormProvider from '@/components/stepFormProvider/stepFormProvider';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import Button from '@/components/button/button';
import Label from '@/components/label/label';
import TextField from '@/components/textField/textField';
import { ArrowLeft, ArrowRight, Check, FormInput } from 'lucide-react';

interface AnimatedFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
	username: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres' }),
	email: z.string().email({ message: 'Email inválido' }),
	password: z.string().min(6, { message: 'Senha deve ter pelo menos 6 caracteres' }),
});

export type FormSignUpData = z.infer<typeof formSchema>;

export default function AnimatedForm({ ...props }: AnimatedFormProps) {
	const [step, setStep] = useState(0);
	const [loading, setLoading] = useState(false);

	const methods = useForm<FormSignUpData>({
		resolver: zodResolver(formSchema),
		mode: 'onChange',
	});

	const steps = [
		{ title: 'Email', component: EmailStep },
		{ title: 'Nome', component: NameStep },
		{ title: 'Senha', component: PasswordStep },
	];

	const isLastStep = step === steps.length - 1;
	const isFirstStep = step === 0;

	const nextStep = () => {
		if (step === 0) {
			// Validar email
			const emailValue = methods.getValues('email');
			if (!emailValue || !formSchema.shape.email.safeParse(emailValue).success) {
				methods.trigger('email');
				return;
			}
		} else if (step === 1) {
			// Validar nome
			const usernameValue = methods.getValues('username');
			if (!usernameValue || !formSchema.shape.username.safeParse(usernameValue).success) {
				methods.trigger('username');
				return;
			}
		} else if (step === 2) {
			// Validar senha
			const passwordValue = methods.getValues('password');
			if (!passwordValue || !formSchema.shape.password.safeParse(passwordValue).success) {
				methods.trigger('password');
				return;
			}
		}

		if (step < steps.length - 1) {
			setStep(step + 1);
		}
	};

	const prevStep = () => {
		if (step > 0) {
			setStep(step - 1);
		}
	};

	const handleNextClick = () => {
		if (isLastStep) {
			methods.handleSubmit(onSubmit)();
		} else {
			nextStep();
		}
	};

	const formComponents = [
		<EmailStep key='email' />,
		<NameStep key='name' />,
		<PasswordStep key='password' />,
	];

	const onSubmit = async () => {
		if (step < steps.length - 1) {
			nextStep();
			return;
		}

		setLoading(true);

		setTimeout(() => {
			toast.success('Simulação de conta!');
			setLoading(false);
		}, 1000);
	};
	return (
		<>
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(onSubmit)}
					className={cn('text-foreground rounded-lg bg-zinc-800 p-4', props.className)}
				>
					<div className='relative h-[200px]'>
						<StepFormProvider forms={formComponents} actualForm={step} />
					</div>

					<div className='flex items-center justify-between'>
						{!isFirstStep && (
							<button
								type='button'
								onClick={prevStep}
								className='hover:bg-muted-foreground/25 flex items-center gap-1 px-4 py-2 text-sm transition-all'
							>
								<ArrowLeft size={16} />
								Voltar
							</button>
						)}

						<div className='ml-auto'>
							<Button type='button' onClick={handleNextClick} loading={loading}>
								{isLastStep ? 'Criar conta' : 'Próximo'}
								{!loading && !isLastStep && <ArrowRight size={16} />}
								{!loading && isLastStep && <Check size={16} />}
							</Button>
						</div>
					</div>
				</form>
			</FormProvider>
		</>
	);
}

function EmailStep() {
	const {
		register,
		formState: { errors },
	} = useFormContext<FormSignUpData>();

	return (
		<div className='flex h-full w-full flex-col space-y-4'>
			<h2 className='flex items-center gap-1 font-light'>
				<FormInput />
				<span>Formulário passo-a-passo</span>
			</h2>
			<LabelInputContainer>
				<Label htmlFor='email'>Endereço de e-mail</Label>
				<TextField id='email' type='email' placeholder='Digite seu email' register={register('email')} />
				{errors.email && <p className='text-xs text-red-500'>{errors.email.message}</p>}
			</LabelInputContainer>
		</div>
	);
}

function NameStep() {
	const {
		register,
		formState: { errors },
	} = useFormContext<FormSignUpData>();

	return (
		<div className='flex h-full w-full flex-col space-y-4'>
			<h2 className='font-light'>Como devemos te chamar?</h2>
			<p className='text-sm'>Digite seu nome para personalizar sua experiência.</p>

			<LabelInputContainer>
				<Label htmlFor='username'>Nome</Label>
				<TextField id='username' placeholder='Digite seu nome' register={register('username')} />
				{errors.username && <p className='text-xs text-red-500'>{errors.username.message}</p>}
			</LabelInputContainer>
		</div>
	);
}

function PasswordStep() {
	const {
		register,
		formState: { errors },
	} = useFormContext<FormSignUpData>();

	return (
		<div className='flex h-full w-full flex-col space-y-4'>
			<h2 className='font-light'>Crie uma senha segura</h2>
			<p className='text-sm'>Use pelo menos 6 caracteres com letras e números.</p>

			<LabelInputContainer>
				<Label htmlFor='password'>Senha</Label>
				<TextField id='password' type='password' placeholder='••••••••' register={register('password')} />
				{errors.password && <p className='text-xs text-red-500'>{errors.password.message}</p>}
			</LabelInputContainer>
		</div>
	);
}

function LabelInputContainer({ children, className }: { children: React.ReactNode; className?: string }) {
	return <div className={cn('flex w-full flex-col space-y-2', className)}>{children}</div>;
}
`;

const componentCode =
	`
//src/components/stepFormProvider/stepFormProvider.tsx
'use client';

import { ReactNode, useEffect, useState } from 'react';

interface FormProviderProps {
	forms: ReactNode[];
	actualForm: number;
}

export default function StepFormProvider({ forms, actualForm }: FormProviderProps) {
	const [prevForm, setPrevForm] = useState(actualForm);
	const [direction, setDirection] = useState(0);
	const [transitioning, setTransitioning] = useState(false);

	useEffect(() => {
		if (actualForm === prevForm) return;

		setDirection(actualForm > prevForm ? 1 : -1);
		setTransitioning(true);

		const timer = setTimeout(() => {
			setPrevForm(actualForm);
			setTransitioning(false);
		}, 300); // deve bater com a duração das animações

		return () => clearTimeout(timer);
	}, [actualForm, prevForm]);

	return (
		<div className='relative h-full w-full overflow-hidden'>
			{/* Form que está saindo */}
			{transitioning && (
				<div
					className='absolute left-0 top-0 h-full w-full'
					style={{
					` +
	"animation: `${direction === 1 ? 'slideOutLeft' : 'slideOutRight'} 300ms ease-in-out forwards`," +
	`					}}
				>
					{forms[prevForm]}
				</div>
			)}

			{/* Form que está entrando */}
			<div
				className='absolute left-0 top-0 h-full w-full'
				style={{
					animation: transitioning` +
	"? `${direction === 1 ? 'slideInRight' : 'slideInLeft'} 300ms ease-in-out forwards`" +
	`: undefined,
				}}
			>
				{forms[transitioning ? actualForm : prevForm]}
			</div>
			` +
	'<style jsx global>{`' +
	'@keyframes slideOutLeft {' +
	`from {
						transform: translateX(0%);
						opacity: 1;
					}
					to {
						transform: translateX(-100%);
						opacity: 0;
					}
				}
				@keyframes slideOutRight {
					from {
						transform: translateX(0%);
						opacity: 1;
					}
					to {
						transform: translateX(100%);
						opacity: 0;
					}
				}
				@keyframes slideInRight {
					from {
						transform: translateX(100%);
						opacity: 0;
					}
					to {
						transform: translateX(0%);
						opacity: 1;
					}
				}
				@keyframes slideInLeft {
					from {
						transform: translateX(-100%);
						opacity: 0;
					}
					to {
						transform: translateX(0%);
						opacity: 1;
					}
				}` +
	'`}</style>' +
	`</div>
	);
}
`;
