import React, { useEffect, useState } from 'react'
import '../styles/Dashboard.css'
import jwt from 'jsonwebtoken'
import AddNote from '../components/AddNote';
import Note from '../components/Note';

export default function Dashboard() {
    const [name, setName] = useState('');  
    const [user,setUser] = useState('')
    const [notes,setNotes] = useState([])


    async function populateNotes() {
		const req = await fetch('http://localhost:8080/api/addnotes', {
            method: 'GET',
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})

		const data = await req.json()
		if (data.status === 'ok') {
            setNotes(data.notes.notes)
		} else {
			alert(data.error)
		}
	}

    useEffect(()=> {
        const token = localStorage.getItem('token');
        const user = jwt.decode(token)
		if (token) {
			setUser(jwt.decode(token))
            const namee = user.name.split(" ")
            setName(
                namee.map((word) => { 
                return word[0].toUpperCase() + word.substring(1); 
            }).join(" ")
            );
			if (!user) {
				localStorage.removeItem('token')
			} else {
				populateNotes()
			}
		}
    },[])  

    // useEffect(() => {
    //     if(user){
    //     populateNotes(); // Fetch initial data
    
    //     const interval = setInterval(() => {
    //       console.log("check")  
    //       populateNotes(); // Fetch updated data every 1 second
    //     }, 5000);

    //     return () => {
    //         clearInterval(interval); // Clean up interval on component unmount
    //       };
    // }
    
    // }, [user]);
    
    return (
        <div className='container h-max'>
            <div className="greeting w-96 mb-4">Welcome! <span className="name underline">{name}</span>
            </div>
            <AddNote notes = {notes} setNotes = {setNotes}/>
            <div className="notes grid grid-cols-4 gap-4">
                {notes.map((item)=>{return <Note key ={item._id} title = {item.title} note = {item.note}/>})}
            </div>

        </div>
    )
}
