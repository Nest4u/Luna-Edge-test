import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'
import path from 'path'

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
	staticDirs: ['../public', '../src/assets'],
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-onboarding',
		'@storybook/experimental-addon-test'
	],
	framework: {
		name: '@storybook/react-vite',
		options: {}
	},
	docs: {
		autodocs: 'tag'
	},
	viteFinal: async config => {
		// Объединяем конфигурацию с настройками Vite
		return mergeConfig(config, {
			resolve: {
				alias: {
					'@': path.resolve(__dirname, '../src/')
				}
			}
		})
	}
}

export default config
