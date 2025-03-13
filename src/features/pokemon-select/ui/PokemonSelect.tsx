import { useEffect, useState } from 'react'
import axios from 'axios'
import { Controller, Control } from 'react-hook-form'
import { Select, SelectOption } from '@shared/ui/select'

interface PokemonSelectProps {
	control: Control<any>
	errors?: Record<string, any>
}

export const PokemonSelect = ({ control, errors }: PokemonSelectProps) => {
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

	if (isLoading) {
		return <div className='text-center py-4'>Loading Pokémon...</div>
	}

	return (
		<div className='space-y-4'>
			<div className='block text-sm font-medium'>
				Select 4 Pokémon <span className='text-red-500'>*</span>
			</div>

			{[...Array(4)].map((_, index) => (
				<Controller
					key={index}
					name={`pokemon[${index}]`}
					control={control}
					rules={{ required: 'Please select a Pokémon' }}
					render={({ field, fieldState }) => (
						<Select
							options={pokemonOptions}
							placeholder={`Select Pokémon ${index + 1}`}
							value={field.value || ''}
							onChange={field.onChange}
							error={fieldState.error?.message}
							required={true}
						/>
					)}
				/>
			))}

			{errors?.pokemon?.root?.message && (
				<p className='text-red-600 text-sm mt-2'>{errors.pokemon.root.message}</p>
			)}
		</div>
	)
}
