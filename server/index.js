const express = require('express');
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL)
console.log(process.env.PORT)
app.use(cors())
app.use(express.json())

app.get('/', (req,res) => {
    res.send("Welcome");
})

app.post('/api/register', async(req,res)=> {
    console.log(req.body);
    const newPassword = await bcrypt.hash(req.body.password, 12)
    try {
        await User.create(
            {name: req.body.name,
             email: req.body.email,
             password: newPassword   
        })
        res.json({status: 'ok'})
    } catch (error) {
        res.json({status: "error", error: "Duplicate Data"})
    }
})

app.post('/api/login', async (req,res) => {
    const user = await User.findOne({
        email: req.body.email, 
    })

    if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

    const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

    if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			process.env.JWT_TOKEN
	)
        return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})

app.get('/api/addnotes', async (req,res) => {
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN)
        const email = decoded.email
        const result = await User.findOne(
            {email: email},
            {notes:1}
        )
        return res.json({ status: 'ok', notes: result })
    } catch (error) {
        console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
    }
})

app.post('/api/addnotes', async (req, res) => {
	const token = req.headers['x-access-token']
	try {
		const decoded = jwt.verify(token, process.env.JWT_TOKEN)
		const email = decoded.email
		const result = await User.updateOne(
			{ email: email },
			{ $push: { notes: {title: req.body.title, note: req.body.note} }}
		)
		return res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.listen(process.env.PORT, ()=> {
    console.log('Server Started');
})