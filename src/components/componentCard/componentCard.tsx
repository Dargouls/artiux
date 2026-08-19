import { RippleContainer } from '@/artiux-components/rippleContainer';
import { Link } from '@/components/link';
import Image, { StaticImageData } from 'next/image';
import { LinkProps } from 'next/link';
import { AspectRatio } from '../ui/aspect-ratio';

interface ComponentCardProps extends LinkProps {
	title: string;
	description: string;
	image: StaticImageData;
}

export default function ComponentCard({ title, description, image, ...props }: ComponentCardProps) {
	return (
		<>
			<RippleContainer color='#919191'>
				<Link href={props.href} className='flex max-w-80 flex-col items-start gap-2'>
					<AspectRatio ratio={16 / 9}>
						<Image src={image} alt='gradient' className='h-full w-full object-cover' />
					</AspectRatio>
					<h4 className='text-2xl font-bold'>{title}</h4>
					<p className='text-start text-sm opacity-80'>{description}</p>
				</Link>
			</RippleContainer>
		</>
	);
}
