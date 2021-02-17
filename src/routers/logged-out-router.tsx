import React from 'react'
import { isLoggedInVar } from '../apollo'

export const LoggedOutRouter = () => {
  const onClick = () => {
    isLoggedInVar(true);
  }
  return (
    <div>
      <h1>Logged Out</h1>
      <button onClick={onClick}>Click to login</button>
    </div>
  )
}

// local-only-field를 업데이트하는 주체! not app but here