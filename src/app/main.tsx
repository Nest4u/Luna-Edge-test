import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../widgets/layout/main-layout/ui/MainLayout'
import '@app/styles/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
