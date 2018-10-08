import React from 'react'

export default function Card (props) {
  return (
    <div>
      <h1>{props.card.title}</h1>
      <label>{props.card.dueDate}</label>
    </div>
  )
}
