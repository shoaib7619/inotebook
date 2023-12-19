import { useState } from "react";
import NoteContex from "./noteContex";
const NoteState =(props)=>{
  const  host ="http://localhost:5000"
   const intialNotes=[]
   const [notes,setNotes]=useState(intialNotes)

   //Get all note
   const getNotes= async ()=>{
    //API call for add note

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET', 
     
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')

        },       
      });
      const json=await response.json()
    //   console.log(json)
      setNotes(json)
}


   //Add Note
const addNote = async (title,description,tag)=>{
        //API call for add note

        const response = await fetch(`${host}/api/notes/addnote/`, {
            method: 'POST', 
         
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
    
            },       
            body: JSON.stringify({title,description,tag}) 
            
          });
          const note = await response.json();
          setNotes(notes.concat(note))
}

   //Delete Note
   const deleteNote=async (id)=>{
      //API call for Delete notes

      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE', 
     
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')

        }     
       
      });

      const json =await response.json();
      console.log(json)
   const newNotes=notes.filter((notes)=>{return notes._id!==id})
   setNotes(newNotes)
    }


   //Edit Note
   const editNote= async (id,title,description,tag)=>{
    //API call for edit notes

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT', 
     
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')

        },       
        body: JSON.stringify({title,description,tag}) 
      });
      const json =await response.json(); 
      console.log(json)
    let newNotes=JSON.parse(JSON.stringify(notes))
    //Logic of edit note in client
    for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id===id){
            newNotes[index].title=title;
            newNotes[index].description=description;
            newNotes[index].tag=tag;
            break;
        }
    }
    setNotes(newNotes)
    }


    return (
        <NoteContex.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContex.Provider>
    )
}


export default NoteState;
