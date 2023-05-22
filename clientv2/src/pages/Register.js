import { useState } from 'react'
import '../styles/Register.css'
// import { useNavigate } from 'react-router-dom'

function Register() {
	// const navigate = useNavigate()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:8080/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		})

		const data = await response.json()

		if (data.status === 'ok') {
			// navigate('/login');
		}
	}

	return (
		<div className='registerModal'>
			<h1>Register</h1>
			<form onSubmit={registerUser}>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					type="text"
					placeholder="Name"
					className= 'registerTextField'
				/>
				<br />
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
					className= 'registerTextField'
				/>
				<br />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password" 
					className= 'registerTextField'
				/>
				<br />
				<input type="submit" value="Register" className='registerButton'/>
			</form>
		</div>
	)
}

export default Register