import React from 'react'
import '../style/error.scss'

const Error = ({message}) => {
  return (
    <div className='error'>{message}</div>
  )
}

export default Error