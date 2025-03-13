import { RegisterOptions } from 'react-hook-form'

export type RegistrationFormData = {
	firstName: string
	lastName: string
	pokemon: string[]
}

export const nameValidation: RegisterOptions<RegistrationFormData, 'firstName' | 'lastName'> = {
	required: 'Name is required',
	minLength: {
		value: 2,
		message: 'Name must be at least 2 characters long'
	},
	maxLength: {
		value: 12,
		message: 'Name must not exceed 12 characters'
	},
	pattern: {
		value: /^[a-zA-Z]{2,12}$/,
		message: 'Only letters (a-z, A-Z) are allowed, between 2-12 characters'
	}
}

export const pokemonTeamValidation: RegisterOptions<RegistrationFormData, 'pokemon'> = {
	validate: (team: string[]) => {
		if (!team || team.length !== 4 || team.some(pokemon => !pokemon)) {
			return 'You must select exactly 4 Pokémon'
		}
		return true
	}
}
