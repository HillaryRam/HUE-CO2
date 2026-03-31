export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
            className={'text-xs font-bold text-red-500 mt-2 ml-4 ' + className}
        >
            {message}
        </p>
    ) : null;
}
