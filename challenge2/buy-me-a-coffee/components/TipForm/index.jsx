import { useState } from 'react'
import styles from './styles.module.css'
import {providers} from 'ethers'

export const TipForm = () => {
  const [isConnected, setConnected] = useState(false);

  const handleConnect = async () => {
    const provider = new providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    setConnected(true)
    // const signer = provider.getSigner()
  }

  const content = isConnected ?
    <form className={styles.form}>
      <div className={styles.inputContainer}>  
        <label htmlFor="name">Name</label>
        <input id="name" type='text' placeholder='Enter your name...' />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="messagge">Messagge</label>
        <textarea id="messagge" placeholder='Enjoy your coffee'></textarea>
      </div>
      <button className={styles.button}>Send 1 Coffee for 0.001ETH...</button>
    </form> : 
    <button onClick={handleConnect} className={styles.button}>Connect Your Wallet</button>
  

  return (
  <section className={styles.section}>
    <h1 className={styles.title}>Buy WiFo A Coffee!</h1>
    {content}
  </section>
  )
}