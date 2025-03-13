import React, { useState, useRef, useEffect } from 'react'

export interface SelectOption {
	value: string
	label: string
	description?: string
}

interface SelectProps {
	options: SelectOption[]
	value: string
	onChange: (value: string) => void
	placeholder?: string
	disabled?: boolean
	label?: string
	required?: boolean
	error?: string
	size?: 'small' | 'medium' | 'large'
	helperText?: string
}

export const Select: React.FC<SelectProps> = ({
	options,
	value,
	onChange,
	placeholder = 'Select option',
	disabled = false,
	label,
	required = false,
	error,
	size = 'medium',
	helperText
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const [filteredOptions, setFilteredOptions] = useState<SelectOption[]>(options)
	const containerRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		const filtered = options.filter(option =>
			option.label.toLowerCase().includes(searchTerm.toLowerCase())
		)
		setFilteredOptions(filtered)
	}, [searchTerm, options])

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleOutsideClick)
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick)
		}
	}, [])

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (disabled) return

		switch (e.key) {
			case 'Enter':
			case 'Space':
				setIsOpen(prev => !prev)
				break
			case 'Escape':
				setIsOpen(false)
				break
			default:
				break
		}
	}

	const clearSelection = (e: React.MouseEvent) => {
		e.stopPropagation()
		onChange('')
	}

	const getSizeClass = () => {
		switch (size) {
			case 'small':
				return 'py-1 px-2 text-sm'
			case 'large':
				return 'py-3 px-4 text-lg'
			default:
				return 'py-2 px-3'
		}
	}

	const selectedOption = options.find(option => option.value === value)
	const isFilled = !!selectedOption

	return (
		<div
			className='w-full'
			ref={containerRef}
		>
			{label && (
				<label className='block text-sm font-medium text-gray-700 mb-1'>
					{label} {required && <span className='text-red-500'>*</span>}
				</label>
			)}

			<div className='relative'>
				<button
					type='button'
					className={`w-full ${getSizeClass()} flex justify-between items-center bg-white border rounded-md focus:outline-none transition-colors duration-200
            ${error ? 'border-red-500' : isFilled ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400 focus:border-blue-500'}
            ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'cursor-pointer'}`}
					onClick={() => !disabled && setIsOpen(!isOpen)}
					onKeyDown={handleKeyDown}
					disabled={disabled}
					aria-haspopup='listbox'
					aria-expanded={isOpen}
					aria-labelledby={label}
				>
					<span
						className={`block truncate ${isFilled ? 'text-blue-700 font-medium' : 'text-gray-500'}`}
					>
						{selectedOption ? selectedOption.label : placeholder}
					</span>
					<span className='ml-2 flex items-center'>
						{isFilled && (
							<span
								onClick={clearSelection}
								className='mr-2 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer'
								aria-label='Clear selection'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-4 w-4'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M6 18L18 6M6 6l12 12'
									/>
								</svg>
							</span>
						)}
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='size-6'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='m19.5 8.25-7.5 7.5-7.5-7.5'
							/>
						</svg>
					</span>
				</button>

				{isOpen && (
					<div className='absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg max-h-60 overflow-auto border border-gray-200'>
						<div className='sticky top-0 bg-white p-2 border-b'>
							<input
								ref={inputRef}
								type='text'
								className='w-full border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none focus:border-blue-500 hover:border-gray-400 transition-colors duration-200'
								placeholder='Search options...'
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
								onKeyDown={e => e.stopPropagation()}
								autoFocus
							/>
						</div>
						<ul
							className='py-1'
							role='listbox'
							aria-activedescendant={selectedOption?.value}
						>
							{filteredOptions.length === 0 ? (
								<li className='px-3 py-2 text-gray-500 text-sm'>No options found</li>
							) : (
								filteredOptions.map(option => (
									<li
										key={option.value}
										className={`px-3 py-2 cursor-pointer transition-colors duration-150 hover:bg-gray-100 
                    ${option.value === value ? 'bg-blue-100 text-blue-800' : ''}`}
										role='option'
										aria-selected={option.value === value}
										onClick={() => {
											onChange(option.value)
											setIsOpen(false)
											setSearchTerm('')
										}}
									>
										<div className='font-medium'>{option.label}</div>
										{option.description && (
											<div className='text-sm text-gray-500'>{option.description}</div>
										)}
									</li>
								))
							)}
						</ul>
					</div>
				)}
			</div>

			{error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
			{helperText && !error && <p className='mt-1 text-sm text-gray-500'>{helperText}</p>}
		</div>
	)
}
