import type { Preview } from '@storybook/react'
import '@/app/styles/index.css'

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			},
			expanded: true,
			sort: 'requiredFirst'
		},
		backgrounds: {
			default: 'light',
			values: [
				{
					name: 'light',
					value: '#ffffff'
				},
				{
					name: 'dark',
					value: '#1a202c'
				},
				{
					name: 'neutral',
					value: '#f7f9fc'
				}
			]
		},
		docs: {
			brandTitle: 'Luna Edge UI Components',
			story: {
				inline: true
			},
			canvas: {
				withToolbar: true
			}
		},
		options: {
			storySort: {
				order: ['Introduction', 'Components', ['Select']]
			}
		}
	}
}

export default preview
