import React from 'react'

import classNames from '../styles/components/Button.scss'

export default function Button ({ onClick, children, ...props }) {
  return (
    <button onClick={onClick} className={classNames.button} {...props}>
      {children}
    </button>
  )
}
