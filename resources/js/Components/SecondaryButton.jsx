export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                'inline-flex items-center justify-center bg-white border-4 border-[#e7e5e4] px-6 py-4 rounded-2xl font-black text-xs text-[#44403c] shadow-sm hover:border-[#a8a29e] hover:bg-[#f5f5f4] transition-all active:shadow-none active:translate-y-1 ' +
                (disabled && 'opacity-25 pointer-events-none ') +
                className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
