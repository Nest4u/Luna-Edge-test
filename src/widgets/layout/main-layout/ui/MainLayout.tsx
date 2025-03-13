import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { PokemonSelect } from '@features/pokemon-select'
import { PokemonModal } from '@features/pokemon-modal'
import { Button } from '@shared/ui/button'
import { Input } from '@shared/ui/input'
import { nameValidation, RegistrationFormData } from '@shared/lib/validation'

export function MainLayout() {
	const [showModal, setShowModal] = useState(false)
	const [selectedPokemon, setSelectedPokemon] = useState<any[]>([])

	const {
		register,
		handleSubmit,
		control,
		watch,
		formState: { errors, isSubmitting },
		trigger
	} = useForm<RegistrationFormData>({
		defaultValues: {
			firstName: '',
			lastName: '',
			pokemon: ['', '', '', '']
		},
		mode: 'all'
	})

	
	const firstName = watch('firstName')
	const lastName = watch('lastName')

	const onSubmit = async (data: RegistrationFormData) => {
		try {
			const pokemonDetails = await Promise.all(
				data.pokemon.map(name =>
					axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`).then(res => res.data)
				)
			)
			setSelectedPokemon(pokemonDetails)
			setShowModal(true)
		} catch (error) {
			console.error('Error fetching Pokemon details:', error)
		}
	}

	const onFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const result = await trigger()
		if (result) {
			handleSubmit(onSubmit)(e)
		}
	}

	return (
		<div className='container mx-auto px-4 py-8'>
			<h1 className='text-3xl font-bold mb-6'>Pokémon Battle Registration</h1>

			<form
				onSubmit={onFormSubmit}
				className='space-y-6'
			>
				<Input
					{...register('firstName', nameValidation)}
					label='First Name'
					required
					error={errors.firstName?.message}
				/>

				<Input
					{...register('lastName', nameValidation)}
					label='Last Name'
					required
					error={errors.lastName?.message}
				/>

				<PokemonSelect
					control={control}
					errors={errors}
				/>

				<Button
					type='submit'
					variant='primary'
				>
					{isSubmitting ? 'Registering...' : 'Register Team'}
				</Button>
			</form>

			<PokemonModal
				isOpen={showModal}
				onClose={() => setShowModal(false)}
				pokemon={selectedPokemon}
				playerName={firstName} 
				playerSurname={lastName} 
			/>
		</div>
	)
}

export default MainLayout
