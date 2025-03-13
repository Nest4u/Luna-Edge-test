import type { Meta, StoryObj } from '@storybook/react'
import { useState, useEffect } from 'react'
import { Select, SelectOption } from './ui/Select'
import axios from 'axios'

import logo from '../../../assets/logos/LunaEdgeLogo.svg?url'
const meta: Meta<typeof Select> = {
	title: 'Components/Select',
	component: Select,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: `
## Select Component

The Select component provides a way for users to choose one option from a filterable dropdown list.

### Features
- Keyboard navigation using up/down arrows and enter key
- Filterable options list by typing
- Customizable styling
- Support for disabled state
- Accessibility support
- Different sizes (small, medium, large)
        `
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		label: {
			control: 'text',
			description: 'Label text displayed above the select'
		},
		placeholder: {
			control: 'text',
			description: 'Placeholder text when no option is selected'
		},
		disabled: {
			control: 'boolean',
			description: 'Whether the select is disabled'
		},
		required: {
			control: 'boolean',
			description: 'Whether the select is required'
		},
		error: {
			control: 'text',
			description: 'Error message to display'
		},
		size: {
			control: { type: 'select' },
			options: ['small', 'medium', 'large'],
			description: 'Size of the select component'
		},
		helperText: {
			control: 'text',
			description: 'Helper text displayed below the select'
		},
		options: {
			description: 'Array of options for the select'
		},
		value: {
			description: 'Currently selected value'
		},
		onChange: {
			description: 'Function called when selection changes',
			action: 'changed'
		}
	},
	decorators: [
		Story => (
			<div className='p-6 bg-white rounded-lg shadow max-w-md'>
				<div className='flex justify-between items-center mb-6 border-b pb-4'>
					<h3 className='text-lg font-semibold text-gray-700'>Select Component</h3>
					<img
						src={logo}
						alt='Luna Edge Logo'
						className='h-8 bg-slate-300 p-2'
					/>
				</div>
				<Story />
			</div>
		)
	]
}

export default meta
type Story = StoryObj<typeof Select>

const defaultOptions = [
	{ value: 'option1', label: 'Option 1' },
	{ value: 'option2', label: 'Option 2' },
	{ value: 'option3', label: 'Option 3' },
	{ value: 'option4', label: 'Option 4' },
	{ value: 'option5', label: 'Option 5' }
]

export const Default: Story = {
	args: {
		options: defaultOptions,
		placeholder: 'Select an option',
		label: 'Select'
	},
	render: args => {
		const [value, setValue] = useState('')
		return (
			<Select
				{...args}
				value={value}
				onChange={newValue => setValue(newValue)}
			/>
		)
	}
}

export const WithHelperText: Story = {
	args: {
		...Default.args,
		label: 'Choose an option',
		helperText: 'Select one of the available options'
	},
	render: Default.render
}

export const WithError: Story = {
	args: {
		...Default.args,
		label: 'Choose an option',
		error: 'This field is required'
	},
	render: Default.render
}

export const Required: Story = {
	args: {
		...Default.args,
		required: true,
		label: 'Required field'
	},
	render: Default.render
}

export const Disabled: Story = {
	args: {
		...Default.args,
		disabled: true,
		label: 'Disabled select'
	},
	render: Default.render
}

export const Sizes: Story = {
	render: () => {
		const [value1, setValue1] = useState('')
		const [value2, setValue2] = useState('')
		const [value3, setValue3] = useState('')

		return (
			<div className='space-y-6'>
				<Select
					options={defaultOptions}
					value={value1}
					onChange={setValue1}
					label='Small size'
					size='small'
				/>
				<Select
					options={defaultOptions}
					value={value2}
					onChange={setValue2}
					label='Medium size (default)'
					size='medium'
				/>
				<Select
					options={defaultOptions}
					value={value3}
					onChange={setValue3}
					label='Large size'
					size='large'
				/>
			</div>
		)
	}
}

export const WithDescriptions: Story = {
	args: {
		label: 'Select with descriptions',
		options: [
			{
				value: 'react',
				label: 'React',
				description: 'A JavaScript library for building user interfaces'
			},
			{
				value: 'vue',
				label: 'Vue',
				description: 'The Progressive JavaScript Framework'
			},
			{
				value: 'angular',
				label: 'Angular',
				description: 'A platform for building mobile and desktop web applications'
			},
			{
				value: 'svelte',
				label: 'Svelte',
				description: 'Cybernetically enhanced web apps'
			}
		]
	},
	render: Default.render
}

export const PokemonSelect: Story = {
	parameters: {
		docs: {
			description: {
				story: 'This example shows a real-world usage with Pokémon data from pokeapi.co'
			}
		}
	},
	render: () => {
		const [pokemonOptions, setPokemonOptions] = useState<SelectOption[]>([])
		const [value, setValue] = useState('')
		const [isLoading, setIsLoading] = useState(true)
		const [selectedPokemon, setSelectedPokemon] = useState<any>(null)

		useEffect(() => {
			axios.get('https://pokeapi.co/api/v2/pokemon?limit=151').then(response => {
				const options = response.data.results.map((p: any) => ({
					value: p.name,
					label: p.name.charAt(0).toUpperCase() + p.name.slice(1)
				}))
				setPokemonOptions(options)
				setIsLoading(false)
			})
		}, [])

		useEffect(() => {
			if (value) {
				axios
					.get(`https://pokeapi.co/api/v2/pokemon/${value}`)
					.then(res => setSelectedPokemon(res.data))
			} else {
				setSelectedPokemon(null)
			}
		}, [value])

		if (isLoading) {
			return (
				<div className='flex items-center justify-center p-4'>
					<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500'></div>
				</div>
			)
		}

		return (
			<div>
				<div className='flex justify-between items-center mb-4'>
					<h2 className='text-lg font-medium'>Pokémon Search</h2>
					<img
						src={logo}
						alt='Luna Edge Logo'
						className='h-8'
					/>
				</div>
				<div className='mb-4'>
					<p className='text-sm text-gray-600'>Type to filter from 151 original Pokémon</p>
				</div>
				<Select
					options={pokemonOptions}
					value={value}
					onChange={setValue}
					placeholder='Search for a Pokémon'
					label='Select Pokémon'
					helperText='Filter by typing a Pokémon name'
				/>

				{selectedPokemon && (
					<div className='mt-8 border-t pt-4'>
						<div className='flex items-center'>
							<img
								src={selectedPokemon.sprites.front_default}
								alt={selectedPokemon.name}
								className='w-24 h-24'
							/>
							<div className='ml-4'>
								<h3 className='text-xl font-bold capitalize'>{selectedPokemon.name}</h3>
								<div className='flex space-x-2 mt-1'>
									{selectedPokemon.types.map((type: any, index: number) => (
										<span
											key={index}
											className='px-2 py-1 rounded text-xs bg-blue-100 text-blue-800'
										>
											{type.type.name}
										</span>
									))}
								</div>
								<div className='mt-2 grid grid-cols-2 gap-2 text-sm'>
									<div>Height: {selectedPokemon.height / 10}m</div>
									<div>Weight: {selectedPokemon.weight / 10}kg</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		)
	}
}

export const FormExample: Story = {
	render: () => {
		const [formData, setFormData] = useState({
			pokemon1: '',
			pokemon2: ''
		})
		const [errors, setErrors] = useState({
			pokemon1: '',
			pokemon2: ''
		})
		const [submitted, setSubmitted] = useState(false)
		const [pokemonOptions, setPokemonOptions] = useState<SelectOption[]>([])
		const [isLoading, setIsLoading] = useState(true)

		useEffect(() => {
			axios.get('https://pokeapi.co/api/v2/pokemon?limit=151').then(response => {
				const options = response.data.results.map((p: any) => ({
					value: p.name,
					label: p.name.charAt(0).toUpperCase() + p.name.slice(1)
				}))
				setPokemonOptions(options)
				setIsLoading(false)
			})
		}, [])

		const handleSubmit = (e: React.FormEvent) => {
			e.preventDefault()

			const newErrors = {
				pokemon1: formData.pokemon1 ? '' : 'Please select your first Pokémon',
				pokemon2: formData.pokemon2 ? '' : 'Please select your second Pokémon'
			}

			setErrors(newErrors)

			if (!newErrors.pokemon1 && !newErrors.pokemon2) {
				setSubmitted(true)
			}
		}

		if (isLoading) {
			return <div className='text-center p-4'>Loading Pokémon...</div>
		}

		if (submitted) {
			return (
				<div className='bg-green-50 border border-green-200 rounded p-4 text-center'>
					<div className='text-green-700 font-medium'>Form submitted successfully!</div>
					<div className='mt-2'>
						Your team: {pokemonOptions.find(p => p.value === formData.pokemon1)?.label} and{' '}
						{pokemonOptions.find(p => p.value === formData.pokemon2)?.label}
					</div>
					<button
						onClick={() => {
							setFormData({ pokemon1: '', pokemon2: '' })
							setSubmitted(false)
						}}
						className='mt-4 bg-white border border-gray-300 px-3 py-1 rounded text-sm'
					>
						Reset Form
					</button>
				</div>
			)
		}

		return (
			<form
				onSubmit={handleSubmit}
				className='space-y-4'
			>
				<div>
					<Select
						options={pokemonOptions}
						value={formData.pokemon1}
						onChange={value => setFormData({ ...formData, pokemon1: value })}
						placeholder='Select your first Pokémon'
						label='First Pokémon'
						error={errors.pokemon1}
						required
					/>
				</div>

				<div>
					<Select
						options={pokemonOptions}
						value={formData.pokemon2}
						onChange={value => setFormData({ ...formData, pokemon2: value })}
						placeholder='Select your second Pokémon'
						label='Second Pokémon'
						error={errors.pokemon2}
						required
					/>
				</div>

				<button
					type='submit'
					className='w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'
				>
					Submit Team
				</button>
			</form>
		)
	}
}
