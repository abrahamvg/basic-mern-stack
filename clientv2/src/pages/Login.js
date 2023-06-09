import { useState } from 'react'
import '../styles/Login.css'

function Login({setLoginModal}) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:8080/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		const data = await response.json()

		if (data.user) {
			localStorage.setItem('token', data.user)
			alert('Login successful')
			window.location.href = '/dashboard'
			setLoginModal(false);

		} else {
			alert('Please check your username and password')
		}
	}

	return (
		<div className='loginModal'>
			<h1>Login</h1>
			<form onSubmit={loginUser}>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
					className= 'loginTextField'
				/>
				<br />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
					className= 'loginTextField'
				/>
				<br />
				<input type="submit" value="Login" className='loginButton'/>
			</form>
		</div>
	)
}

export default Login