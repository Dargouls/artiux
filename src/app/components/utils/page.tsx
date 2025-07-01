import CopyCode from '@/components/copyCode/copyCode';

export default function Utils() {
	return (
		<>
			<div>
				<h1 className='mt-20 text-5xl font-bold'>Adicione os utilitários</h1>
				<p className='text-muted-foreground mt-4 block text-xl'>
					São as dependências básicas para copiar qualquer componente para o seu projeto
				</p>

				<section>
					<section className='my-8'>
						<h3 className='text-2xl font-bold'>Código:</h3>
						<div className='mt-4 h-52 place-content-start'>
							<CopyCode installs='yarn add motion clsx tailwind-merge' code={code} />
						</div>
					</section>
				</section>
			</div>
		</>
	);
}

const code = `// lib/utils.ts

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`;
