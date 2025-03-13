import { Button } from '@shared/ui/button'
import { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'

interface PokemonModalProps {
	isOpen: boolean
	onClose: () => void
	pokemon: any[]
	playerName?: string
	playerSurname?: string
	onSave?: (pokemon: any[]) => void
}

const Toast = ({ message, onClose }: { message: string; onClose: () => void }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose()
		}, 3000)

		return () => clearTimeout(timer)
	}, [onClose])

	return (
		<div className='fixed top-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 shadow-md rounded flex justify-between items-center z-50'>
			<div>{message}</div>
			<button
				onClick={onClose}
				className='ml-4 text-red-700'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth='1.5'
					stroke='currentColor'
					className='size-5'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M6 18 18 6M6 6l12 12'
					/>
				</svg>
			</button>
		</div>
	)
}

export const PokemonModal = ({
	isOpen,
	onClose,
	pokemon: initialPokemon,
	playerName = 'Player',
	playerSurname = 'One',
	onSave
}: PokemonModalProps) => {
	const [pokemon, setPokemon] = useState<any[]>([])
	const [hasDuplicates, setHasDuplicates] = useState<boolean>(false)
	const [showToast, setShowToast] = useState<boolean>(false)

	useEffect(() => {
		if (isOpen && initialPokemon && initialPokemon.length > 0) {
			const pokemonIds = initialPokemon.map(p => p.id)
			const uniqueIds = new Set(pokemonIds)

			const duplicatesExist = uniqueIds.size !== pokemonIds.length
			setHasDuplicates(duplicatesExist)

			if (!duplicatesExist) {
				setPokemon([...initialPokemon])
			} else {
				setShowToast(true)
				onClose()
			}
		}
	}, [initialPokemon, isOpen, onClose])

	if (!isOpen || hasDuplicates)
		return showToast ? (
			<Toast
				message='Your team cannot contain duplicate Pokémon'
				onClose={() => setShowToast(false)}
			/>
		) : null

	const handleDragEnd = (result: DropResult) => {
		if (!result.destination) return

		const items = Array.from(pokemon)
		const [reorderedItem] = items.splice(result.source.index, 1)
		items.splice(result.destination.index, 0, reorderedItem)

		setPokemon(items)
	}

	const handleCancel = () => {
		onClose()
	}

	const handleSave = () => {
		if (onSave) onSave(pokemon)
		onClose()
	}

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-white p-6 rounded-lg max-w-2xl w-full relative'>
				<button
					onClick={onClose}
					className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
					aria-label='Close'
				>
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
							d='M6 18 18 6M6 6l12 12'
						/>
					</svg>
				</button>

				<h2 className='text-2xl font-bold mb-4'>Your Pokémon Team</h2>

				<DragDropContext onDragEnd={handleDragEnd}>
					<Droppable
						droppableId='pokemon-team'
						direction='horizontal'
					>
						{provided => (
							<div
								className='flex flex-wrap gap-4'
								{...provided.droppableProps}
								ref={provided.innerRef}
							>
								{pokemon.map((p, index) => (
									<Draggable
										key={p.id.toString()}
										draggableId={p.id.toString()}
										index={index}
									>
										{provided => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												className='w-[calc(25%-16px)] text-center p-2 border border-gray-200 rounded-lg bg-white hover:shadow-md cursor-grab'
											>
												<img
													src={p.sprites.front_default}
													alt={p.name}
													className='mx-auto'
												/>
												<p className='capitalize font-medium'>{p.name}</p>
											</div>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>

				<div className='mt-6 flex justify-between items-center'>
					<div className='text-left'>
						<p className='text-lg font-medium'>
							{playerName} {playerSurname}
						</p>
						<p className='text-sm text-gray-500'>Pokémon Trainer</p>
						<p className='text-xs text-amber-600 mt-1'>
							Note: Duplicate Pokémon are not allowed in teams
						</p>
					</div>

					<div className='flex space-x-2'>
						<Button
							onClick={handleCancel}
							variant='secondary'
						>
							Cancel
						</Button>
						<Button
							onClick={handleSave}
							variant='primary'
						>
							Save
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
