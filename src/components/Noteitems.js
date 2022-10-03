import React from 'react'

export default function Noteitems(props) {
    const { note } = props
    return (
        <>
            <div className="col-md-3" >
                <div className="card-body" key={note._id}>
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </>
    )
}
