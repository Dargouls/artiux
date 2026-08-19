import { Link } from '@/components/link';
import { Github, Globe, Linkedin } from 'lucide-react';

export default function Footer() {
	return (
		<footer className='mt-20 border-t border-gray-800 bg-black text-white'>
			<div className='mx-auto max-w-6xl px-6 py-12'>
				<div className='grid grid-cols-1 items-center gap-8 md:grid-cols-3'>
					{/* Brand Section */}
					<div className='text-center md:text-left'>
						<h3 className='mb-2 text-xl font-semibold'>ArtIux</h3>
						<p className='text-sm text-gray-400'>Componentes animados para suas aplicações</p>
					</div>

					{/* Links Section */}
					<div className='text-center'>
						<div className='flex flex-col space-y-3'>
							<a href='#' className='text-sm font-medium text-gray-300 transition-colors hover:text-white'>
								Documentação
							</a>
							<a href='#' className='text-sm font-medium text-gray-300 transition-colors hover:text-white'>
								Componentes
							</a>
							<a
								href='#'
								className='inline-block border-b border-white/20 pb-1 text-sm font-semibold text-white transition-colors hover:text-gray-300'
							>
								Ver Portfólio Principal
							</a>
						</div>
					</div>

					{/* Social Links */}
					<div className='text-center md:text-right'>
						<div className='mb-4 flex justify-center space-x-4 md:justify-end'>
							<Link href='https://github.com/Dargouls' className='text-gray-400 transition-colors hover:text-white' aria-label='GitHub'>
								<Github className='h-5 w-5' />
							</Link>
							<Link
								href='https://www.linkedin.com/in/gabriel-azevedo-b72b27191'
								className='text-gray-400 transition-colors hover:text-white'
								aria-label='LinkedIn'
							>
								<Linkedin className='h-5 w-5' />
							</Link>
							<Link href='https://www.gabrielzv.com' className='text-gray-400 transition-colors hover:text-white' aria-label='Portfólio'>
								<Globe className='h-5 w-5' />
							</Link>
						</div>
					</div>
				</div>

				{/* Bottom Section */}
				<div className='mt-8 border-t border-gray-800 pt-6'>
					<div className='flex flex-col items-center justify-between text-sm text-gray-400 md:flex-row'>
						<p className='mb-2 md:mb-0'>© 2024 artIux. Todos os direitos reservados.</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
