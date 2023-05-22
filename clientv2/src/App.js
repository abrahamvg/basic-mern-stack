import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './pages/Navbar'
import Footer from './pages/Footer'
import Dashboard from './pages/Dashboard'

import './App.css'

const App = () => {
	return (
		<>
			<div>
				<Navbar/>
				<BrowserRouter>
					<Routes>
						<Route path="/login" Component={Login} />
						<Route path="/register" Component={Register} />
						<Route path="/dashboard" Component={Dashboard} />
						<Route path="/" Component={Dashboard} />
					</Routes>
				</BrowserRouter>
			</div>
			
		</>
	)
}

export default App