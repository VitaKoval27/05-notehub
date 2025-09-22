import css from "./NoteList.module.css";
import type { Note } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  deleteNote } from "../../services/noteService";


interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {

  const queryClient=useQueryClient();

  const deleteNoteMutation=useMutation({
    mutationFn:(noteId:string)=>deleteNote(noteId),
    onSuccess:()=>queryClient.invalidateQueries({queryKey:["notes"]}),
  })
  
  if (notes.length === 0) {
    return <p>No notes been found</p>;
  }

  

  const handleDelete=(noteId:string)=>{
    deleteNoteMutation.mutate(noteId)
  }



  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button className={css.button} onClick={()=>handleDelete(note.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
