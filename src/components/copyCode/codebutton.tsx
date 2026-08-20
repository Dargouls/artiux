'use client';

import { MouseClick } from '@/artiux/components/mouseClick';
import { cn } from '@/lib/utils';
import { Check, Copy } from 'lucide-react';
import { forwardRef, useRef, useState } from 'react';

interface CodeButtonProps extends React.HTMLAttributes<HTMLDivElement> {
	code: string;
}

const CodeButton = forwardRef<HTMLButtonElement, CodeButtonProps>(({ code, ...props }, refC) => {
	const ref = useRef<any>(null);
	const [isCopied, setIsCopied] = useState(false);

	const copyCode = () => {
		navigator.clipboard.writeText(code);
		setTimeout(() => {
			setIsCopied(false);
		}, 1000);
		setIsCopied(true);
	};

	return (
		<>
			<button ref={ref} className={cn(props.className)}>
				{isCopied ? <Check size={16} className='text-green-500' /> : <Copy size={16} onClick={copyCode} />}
			</button>
			<MouseClick targetRef={ref} />
		</>
	);
});

export default CodeButton;
