export default function Button({ as: Component = 'button', variant = 'primary', className = '', disabled = false, children, ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none'
  const variants = {
    primary: disabled
      ? 'bg-gray-300 text-white cursor-not-allowed opacity-50'
      : 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    secondary: disabled
      ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
      : 'bg-white text-primary border border-primary/20 hover:bg-primary/5',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
  }

  return (
    <Component
      disabled={disabled}
      className={`${base} ${variants[variant] ?? variants.primary} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
