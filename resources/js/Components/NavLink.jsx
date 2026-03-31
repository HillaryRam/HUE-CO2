import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-[#87AF4C] text-[#1c1917] focus:border-[#87AF4C]'
                    : 'border-transparent text-[#a8a29e] hover:border-[#e7e5e4] hover:text-[#44403c] focus:border-[#e7e5e4] focus:text-[#44403c]') +
                className
            }
        >
            {children}
        </Link>
    );
}
