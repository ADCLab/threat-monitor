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
    "cursor-pointer rounded-full border border-solid border-gray-500 border-2 transition-colors flex items-center justify-center bg-gray-200 text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5";

  // Conditionally add disabled styling if the button is disabled.
  const disabledClass = props.disabled
    ? " bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-400"
    : "";

  const combinedClassName = className
    ? `${baseClassName} ${disabledClass} ${className}`
    : `${baseClassName} ${disabledClass}`;

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
