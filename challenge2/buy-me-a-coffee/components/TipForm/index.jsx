import { useState } from 'react'
import styles from './styles.module.css'

const INITIAL_INPUTS_STATE = {
  name: '',
  message: ''
}

export const TipForm = ({buyMeACoffee}) => {
  const [userInputs, setUserInputs] = useState(INITIAL_INPUTS_STATE)

  const handleNameChange = (e) => {
    setUserInputs(prevInputs => {
      return {
        ...prevInputs,
        name: e.target.value
      }
    })
  }

  const handleMessageChange = (e) => {
    setUserInputs(prevInputs => {
      return {
        ...prevInputs,
        message: e.target.value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await buyMeACoffee(userInputs)
    setUserInputs(INITIAL_INPUTS_STATE)
  }

  return (
  <section className={styles.section}>
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputContainer}>  
        <label htmlFor="name">Name</label>
        <input onChange={handleNameChange} value={userInputs.name} id="name" type='text' placeholder='Enter your name...' />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="message">Message</label>
        <textarea onChange={handleMessageChange} value={userInputs.message} id="message" placeholder='Enjoy your coffee'></textarea>
      </div>
      <button className={styles.button}>Send 1 Coffee for 0.001ETH</button>
    </form>
  </section>
  )
}