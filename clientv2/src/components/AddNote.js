import React, { useState } from 'react'
import NoteModal from './NoteModal'

const noteStyle = {
    backgroundColor: "#f4b31a",
    color: "#ffffff",
    width: "fit-content",
    borderRadius: "8px",
    cursor : "pointer",

    fontWeight: "600",

    padding: "12px 16px",

    position: "fixed",
    bottom: "5%",
    right: "10%",
    zIndex: "1",
}



export default function AddNote({notes,setNotes}) {
const [noteModal, setNoteModal] = useState(false)    
function addNote(){
    setNoteModal(!noteModal)
}
  return (
    <>
        <div className='addNoteButton' style={noteStyle} onClick = {addNote}>AddNote</div>
        {noteModal ? <NoteModal setNoteModal = {setNoteModal}/> : ''}
    </>
  )
}
