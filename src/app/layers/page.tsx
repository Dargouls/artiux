'use client';

import Button from '@/artiux-components/button';
import Dialog from '@/artiux-components/dialog';

import { useState } from 'react';

export default function Layers() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<main className='flex items-center justify-center'>
				<Button className='mt-40 w-max' onClick={() => setOpen(true)}>
					Mostrar Dialog
				</Button>
				<Dialog open={open} onClose={() => setOpen(false)}>
					<Dialog.Header>
						<h3>Titulo</h3>
					</Dialog.Header>
					<Dialog.Body>
						<p>Corpo do Dialog</p>
					</Dialog.Body>
					<Dialog.Footer>
						<Button onClick={() => setOpen(false)}>Fechar</Button>
					</Dialog.Footer>
				</Dialog>
			</main>
		</>
	);
}
