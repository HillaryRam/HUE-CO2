import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'w-full bg-[#f5f5f4] border-4 border-[#e7e5e4] rounded-2xl py-4 px-6 text-sm font-bold focus:outline-none focus:border-[#87AF4C] transition-colors ' +
                className
            }
            ref={localRef}
        />
    );
});
