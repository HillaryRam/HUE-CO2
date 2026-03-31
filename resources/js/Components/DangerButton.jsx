export default function DangerButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                'w-full bg-red-50 text-red-600 border-4 border-red-100 py-4 px-10 rounded-2xl font-black text-sm shadow-sm hover:bg-red-100 hover:border-red-200 transition-all active:shadow-none active:translate-y-1 whitespace-nowrap ' +
                (disabled && 'opacity-25 pointer-events-none ') +
                className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
