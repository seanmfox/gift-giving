import React from 'react'
import Button from './styles/Button';

const JoinForm = props => (
  <div>
    <form onSubmit={props.handleJoinSubmit}>
      <label>
      <input type='text' onChange={props.handleChangeText} name='accessCode' />
      </label>
      <Button type='submit'>Join Group</Button>
    </form>
  </div>
)

export default JoinForm
