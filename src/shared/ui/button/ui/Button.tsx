import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'danger' | 'outline-primary' | 'text'
	size?: 'sm' | 'md' | 'lg'
	children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ variant = 'primary', size = 'md', children, className = '', ...props }, ref) => {
		const baseStyles = 'font-medium rounded focus:outline-none transition-colors duration-200'

		const variantStyles = {
			primary: 'bg-blue-500 text-white hover:bg-blue-600',
			secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
			danger: 'bg-red-500 text-white hover:bg-red-600',
			'outline-primary': 'bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-50',
			text: 'bg-transparent text-blue-500 hover:text-blue-700 hover:underline'
		}

		const sizeStyles = {
			sm: 'px-3 py-1 text-sm',
			md: 'px-4 py-2',
			lg: 'px-5 py-3 text-lg'
		}

		const classes = `${baseStyles} ${variantStyles[variant]} ${variant !== 'text' ? sizeStyles[size] : ''} ${className}`

		return (
			<button
				ref={ref}
				className={classes}
				{...props}
			>
				{children}
			</button>
		)
	}
)

Button.displayName = 'Button'
