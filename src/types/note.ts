export type NoteTag = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";

export  interface Note{
    id:string,
    title:string,
    content:string,
    createdAt:string,
    updeateAt:string,
    tag:NoteTag,
}