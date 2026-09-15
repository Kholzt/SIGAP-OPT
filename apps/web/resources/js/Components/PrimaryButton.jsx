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
                `inline-flex items-center justify-center rounded-xl border border-transparent bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-600 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 active:bg-primary-700 disabled:opacity-60 disabled:pointer-events-none ${
                    disabled && 'opacity-60'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
