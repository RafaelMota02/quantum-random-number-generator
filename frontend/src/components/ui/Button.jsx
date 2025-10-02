/**
 * Reusable Button component with consistent styling
 */
const Button = ({ children, className = '', variant = 'primary', size = 'md', disabled, ...props }) => {
  const baseStyles = 'font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900';

  const variants = {
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-500 disabled:to-slate-600 text-white focus:ring-indigo-500',
    secondary: 'bg-slate-700 hover:bg-slate-600 disabled:bg-slate-500 text-white focus:ring-slate-500',
    danger: 'bg-red-600 hover:bg-red-700 disabled:bg-red-500 text-white focus:ring-red-500'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-lg',
    lg: 'px-8 py-4 text-xl'
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'cursor-not-allowed' : 'hover:scale-105 active:scale-95'} ${className || ''}`;

  return (
    <button
      className={classes}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
