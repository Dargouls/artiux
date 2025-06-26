import bubbleButton from '@/assets/components/bubble-button.png';
import dialog from '@/assets/components/dialog.png';
import ripple from '@/assets/components/ripple.png';
import stepform from '@/assets/components/stepform.png';

import ComponentCard from '@/components/componentCard/componentCard';

export default function Page() {
	return (
		<>
			<main className='mt-20 px-10 text-center'>
				<h1 className='text-4xl'>Descubra todos os componentes que temos</h1>

				<div className='mt-20 grid grid-cols-1 gap-4 place-self-center md:grid-cols-2'>
					<ComponentCard
						title='Dialog'
						description='Um Dialog com animação de expansão'
						image={dialog}
						href={'/components/dialog'}
					/>
					<ComponentCard
						title='Bubble Button'
						description='Um botão com animação de SVGs flutuantes ao clicar'
						image={bubbleButton}
						href={'/components/bubble-button'}
					/>
					<ComponentCard
						title='Step Form'
						description='Um provider de formulário com animação passo-a-passo'
						image={stepform}
						href={'/components/step-form'}
					/>
					<ComponentCard
						title='Ripple Container'
						description='Container flexível com animação de ripple (útil também para botões)'
						image={ripple}
						href={'/components/ripple-container'}
					/>
				</div>
			</main>
		</>
	);
}
