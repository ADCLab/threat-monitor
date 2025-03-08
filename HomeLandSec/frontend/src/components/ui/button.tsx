export default function Button({
	children,
	href,
	className,
	...props
}: Readonly<{
	children: React.ReactNode;
	href?: string;
	className?: string;
	[key: string]: unknown;
}>) {
	const baseClassName =
		"cursor-pointer rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5";

	const combinedClassName = className ? `${baseClassName} ${className}` : baseClassName;

	if (href) {
		return (
			<a
				className={combinedClassName}
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				{...props}
			>
				{children}
			</a>
		);
	}
	return (
		<button type="button" className={combinedClassName} {...props}>
			{children}
		</button>
	);
}

