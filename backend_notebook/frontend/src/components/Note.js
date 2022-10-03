import React, { useContext } from 'react'
import NoteContext from '../context/Notecontext'
import Noteitems from './Noteitems'

function Note() {
    const context = useContext(NoteContext)
    const {Note, setNotes}=context
    return (
        <>
            <div className='my-5'>
                <h2>Add Note</h2>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Title</label>
                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                </div>
                <div class="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" class="form-label">Description</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <button type="button" class="btn btn-primary">Add Note</button>
            </div>
            <div className='row'>
                <h2>Your Note</h2>
                {Note.map((note)=>{
                   return <Noteitems note={note}/>
                })}
            </div>
        </>
    )
}

export default Note