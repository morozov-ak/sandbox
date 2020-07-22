import React from 'react'

export const NoteCard = ({ note }) => {
  return (
    <>
      <h2>{note.name}</h2>

      <p>Ваша ссылка: <a href={note.name} target="_blank" rel="noopener noreferrer">{note.to}</a></p>
      <p>Откуда: <a href={note.from} target="_blank" rel="noopener noreferrer">{note.from}</a></p>
      <p>Количество кликов по ссылке: <strong>{note.clicks}</strong></p>
      <p>Дата создания: <strong>{new Date(note.date).toLocaleDateString()}</strong></p>
    </>
  )
}
