import { useState } from "react";
import NoteContext from "./Notecontext";
const NoteState = (props)=>{
    const noteInitial=[
        {
          "_id": "631472be1510190696c5a29fd",
          "user": "63101bacae3c73dde5f83b25",
          "title": "i am ti12tle",
          "description": "de12s5c",
          "tag": "im ta12g",
          "date": "2022-09-04T09:41:18.260Z",
          "__v": 0
        },
        {
          "_id": "631472be1510190696ca291fd",
          "user": "63101bacae3c73dde5f83b25",
          "title": "i am ti12tle",
          "description": "de12s5c",
          "tag": "im ta12g",
          "date": "2022-09-04T09:41:18.260Z",
          "__v": 0
        },
        {
          "_id": "631472be81510190696ca29fd",
          "user": "63101bacae3c73dde5f83b25",
          "title": "i am ti12tle",
          "description": "de12s5c",
          "tag": "im ta12g",
          "date": "2022-09-04T09:41:18.260Z",
          "__v": 0
        },
        {
          "_id": "631472be151018890696ca29fd",
          "user": "63101bacae3c73dde5f83b25",
          "title": "i am ti12tle",
          "description": "de12s5c",
          "tag": "im ta12g",
          "date": "2022-09-04T09:41:18.260Z",
          "__v": 0
        }
      ]
      const [Note, setNote] = useState(noteInitial)
    return (
            <NoteContext.Provider value={{Note, setNote}}>
                  {props.children}  
            </NoteContext.Provider>
    )
}
export default NoteState