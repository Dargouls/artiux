import { useFormContext } from 'react-hook-form';

import Label from '@/components/label/label';
import TextField from '@/components/textField/textField';
import { FormSignUpData } from './animatedForm';
import LabelInputContainer from './labelInputContainer';

export default function PasswordStep() {
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
