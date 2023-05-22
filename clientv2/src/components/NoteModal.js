import React, { useState } from 'react'
import '../styles/NoteModal.css'

export default function NoteModal({setNoteModal}) {
  const [title, setTitle] = useState('')  
  const [note, setNote] = useState('')  

  async function addNote(e){
    e.preventDefault();
    const req = await fetch('http://localhost:8080/api/addnotes', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': localStorage.getItem('token'),
			},
			body: JSON.stringify({
				title: title,
                note: note
			}),
    })
    setNoteModal(false)
  }  
  return (
  <div className="background">
    <div className='registerModal'>
			<h1>Add Note</h1>
			<form onSubmit={addNote}>
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					type="text"
					placeholder="Title"
					className= 'noteTextField'
				/>
				<br />
				<br />
				<input
					value={note}
					onChange={(e) => setNote(e.target.value)}
					type="text"
					placeholder="Add Note"
					className= 'noteTextField'
				/>
				<br />
				<input type="submit" value="Submit" className='noteButton'/>
			</form>
	</div>
  </div>
  )
}
