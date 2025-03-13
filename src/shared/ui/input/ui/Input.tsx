import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	error?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ label, error, className = '', ...props }, ref) => {
		return (
			<div className='w-full'>
				{label && (
					<label className='block text-sm font-medium mb-2'>
						{label}
						{props.required && <span className='text-red-500 ml-1'>*</span>}
					</label>
				)}
				<input
					ref={ref}
					className={`w-full p-2 border rounded transition-colors duration-200 
            ${error ? 'border-red-500 focus:border-red-600' : 'border-gray-300 hover:border-gray-400 focus:border-blue-500'} 
            focus:outline-none focus:ring-2 focus:ring-opacity-50 ${error ? 'focus:ring-red-300' : 'focus:ring-blue-300'} 
            ${className}`}
					{...props}
				/>
				{error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
			</div>
		)
	}
)

Input.displayName = 'Input'
