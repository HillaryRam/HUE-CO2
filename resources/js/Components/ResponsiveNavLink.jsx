import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-[#87AF4C] bg-[#f0fdf4] text-[#166534] focus:border-[#87AF4C] focus:bg-[#f0fdf4] focus:text-[#166534]'
                    : 'border-transparent text-[#a8a29e] hover:border-[#e7e5e4] hover:bg-[#f5f5f4] hover:text-[#44403c] focus:border-[#e7e5e4] focus:bg-[#f5f5f4] focus:text-[#44403c]'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
