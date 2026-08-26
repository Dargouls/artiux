interface Props extends React.HTMLAttributes<HTMLDivElement> {}

function Mark({ children, ...props }: Props) {
	return (
		<>
			<mark className='rounded-xs bg-input text-foreground px-0.5'>{children}</mark>
		</>
	);
}

export { Mark };
