export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-[10px] font-black uppercase text-[#a8a29e] tracking-widest mb-2 ml-4 ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
