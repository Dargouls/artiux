import { Aside } from '@/artiux/components/aside';
import CopyCode from '@/components/copyCode/copyCode';

const asideItems = [{ id: 'code', label: 'Instalação' }];

export default function Utils() {
	return (
		<div className='flex items-start gap-10'>
			<div className='min-w-0 flex-1'>
				<div>
					<h1 className='mt-20 text-5xl font-bold'>Adicione os utilitários</h1>
					<p className='text-muted-foreground mt-4 block text-xl'>
						São as dependências básicas para copiar qualquer componente para o seu projeto
					</p>
				</div>

				<section id='code' className='my-8 scroll-mt-24'>
					<h3 className='text-2xl font-bold'>Instalação:</h3>
					<div className='mt-4 place-content-start'>
						<CopyCode installs='yarn add motion clsx tailwind-merge' code={code} fileName='lib/utils.ts' />
					</div>
				</section>
			</div>

			<Aside items={asideItems} />
		</div>
	);
}

const code = `// lib/utils.ts

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`;
