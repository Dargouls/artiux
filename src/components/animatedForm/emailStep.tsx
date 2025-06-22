import Label from '@/components/label/label';
import { FormInput } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import TextField from '../textField/textField';
import { FormSignUpData } from './animatedForm';
import LabelInputContainer from './labelInputContainer';

export default function EmailStep() {
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
