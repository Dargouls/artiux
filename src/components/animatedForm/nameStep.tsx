import Label from '@/components/label/label';
import { useFormContext } from 'react-hook-form';
import TextField from '../textField/textField';
import { FormSignUpData } from './animatedForm';
import LabelInputContainer from './labelInputContainer';

export default function NameStep() {
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
