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

				<div className='mt-20 grid grid-cols-1 gap-4 place-self-center md:grid-cols-2 lg:grid-cols-3'>
					<ComponentCard title='Dialog' description='Um Dialog com animação de expansão' image={dialog} href={'/components/dialog'} />
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
					<ComponentCard title='Calendar' description='Um calendário para seleção de datas' image={dialog} href={'/components/calendar'} />
					<ComponentCard
						title='Input Number'
						description='Um input numérico com controles de incremento e decremento'
						image={dialog}
						href={'/components/inputNumber'}
					/>
					<ComponentCard
						title='Progress Bar'
						description='Uma barra de progresso animada'
						image={dialog}
						href={'/components/progressBar'}
					/>
					<ComponentCard title='Text' description='Um componente de texto com animações' image={dialog} href={'/components/text'} />
					<ComponentCard
						title='Button'
						description='Um botão com efeito ripple, estado de loading e ornamentos'
						image={dialog}
						href={'/components/button'}
					/>
					<ComponentCard
						title='Button Group'
						description='Agrupa botões lado a lado, com separadores opcionais'
						image={dialog}
						href={'/components/buttonGroup'}
					/>
					<ComponentCard
						title='Icon Button'
						description='Um botão quadrado só com ícone, com efeito ripple e loading'
						image={dialog}
						href={'/components/iconButton'}
					/>
					<ComponentCard
						title='Badge'
						description='Uma etiqueta compacta para status, categorias e contadores'
						image={dialog}
						href={'/components/badge'}
					/>
					<ComponentCard
						title='Card'
						description='Um container para agrupar conteúdo relacionado'
						image={dialog}
						href={'/components/card'}
					/>
					<ComponentCard
						title='Drawer'
						description='Um painel deslizante para conteúdo ou ações contextuais'
						image={dialog}
						href={'/components/drawer'}
					/>
					<ComponentCard title='Tabs' description='Abas animadas, já responsivas para mobile' image={dialog} href={'/components/tabs'} />
					<ComponentCard
						title='Switch'
						description='Um alternador para ligar/desligar uma opção'
						image={dialog}
						href={'/components/switch'}
					/>
					<ComponentCard
						title='Checkbox Compose'
						description='Um card de checkbox com título, descrição, imagem e ação opcionais'
						image={dialog}
						href={'/components/checkboxCompose'}
					/>
					<ComponentCard
						title='Radio Compose'
						description='Um card de opção de rádio com título, descrição e ação opcionais'
						image={dialog}
						href={'/components/radioCompose'}
					/>
					<ComponentCard
						title='Radio Group'
						description='Um grupo de opções de rádio simples e acessível'
						image={dialog}
						href={'/components/radioGroup'}
					/>
					<ComponentCard
						title='Text Field'
						description='Um input de texto com máscara, ornamentos e mensagens de ajuda/erro'
						image={dialog}
						href={'/components/textField'}
					/>
					<ComponentCard
						title='Circular Progress'
						description='Uma barra de progresso circular animada'
						image={dialog}
						href={'/components/circularProgress'}
					/>
					<ComponentCard title='Icons' description='Centenas de ícones SVG, acessados por nome' image={dialog} href={'/components/icons'} />
					<ComponentCard
						title='Select'
						description='Um seletor de opções em drawer, com suporte a ícone e descrição'
						image={dialog}
						href={'/components/select'}
					/>
					<ComponentCard
						title='Multi Select'
						description='Um seletor de múltiplas opções em drawer, com busca e limite de seleção'
						image={dialog}
						href={'/components/multiSelect'}
					/>
				</div>
			</main>
		</>
	);
}
