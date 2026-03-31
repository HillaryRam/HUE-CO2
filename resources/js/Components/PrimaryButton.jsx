export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                'w-full bg-[#1c1917] text-white py-4 px-10 rounded-2xl font-black text-sm shadow-[0_8px_0_0_#000] hover:bg-[#292524] transition-all active:shadow-none active:translate-y-2 whitespace-nowrap ' +
                (disabled && 'opacity-25 pointer-events-none ') +
                className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
