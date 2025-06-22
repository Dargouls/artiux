'use client';

import { useState } from 'react';
import StepFormProvider from '../stepFormProvider/stepFormProvider';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import BubbleButton from '../button/button';
import EmailStep from './emailStep';
import NameStep from './nameStep';
import PasswordStep from './passwordStep';

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
		// Validar o campo atual antes de avançar
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

	// Função para lidar com o clique no botão "Próximo"
	const handleNextClick = () => {
		if (isLastStep) {
			// No último passo, o botão "Próximo" submete o formulário
			methods.handleSubmit(onSubmit)();
		} else {
			// Nos outros passos, apenas avança para o próximo
			nextStep();
		}
	};

	// Componentes de formulário para o StepFormProvider
	const formComponents = [
		<EmailStep key='email' />,
		<NameStep key='name' />,
		<PasswordStep key='password' />,
	];

	const onSubmit = async (data: FormSignUpData) => {
		// Verificar se estamos no último passo
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
					className='text-foreground rounded-lg bg-zinc-800 p-4'
				>
					<div className='relative h-[180px]'>
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
							<BubbleButton
								type='button' // Mudado para type='button' para evitar submit automático
								onClick={handleNextClick}
								loading={loading}
							>
								{isLastStep ? 'Criar conta' : 'Próximo'}
								{!loading && !isLastStep && <ArrowRight size={16} />}
								{!loading && isLastStep && <Check size={16} />}
							</BubbleButton>
						</div>
					</div>
				</form>
			</FormProvider>
		</>
	);
}
