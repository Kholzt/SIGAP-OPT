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
                `inline-flex items-center justify-center rounded-xl bg-rose-500 hover:bg-rose-600 px-5 py-2 text-sm font-semibold text-white transition focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 active:bg-rose-700 disabled:opacity-60 disabled:pointer-events-none ${
                    disabled && 'opacity-60'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
