import { useEffect, useRef, useState } from 'react'
import {providers, Contract, utils} from 'ethers'
import contractData from '../../utils/BuyMeACoffee.json'
import styles from './styles.module.css'

const INITIAL_INPUTS_STATE = {
  name: '',
  message: ''
}

const {address, abi} = contractData

export const TipForm = () => {
  const [isConnected, setConnected] = useState(false);
  const [userInputs, setUserInputs] = useState(INITIAL_INPUTS_STATE)
  const web3ProviderRef = useRef(null)

  const handleConnect = async () => {
    await connectWallet()
  }

  const connectWallet = async () => {
    console.log('Connecting your wallet...')
    const {ethereum} = window
    if(!ethereum){
      alert('Please install metamask')
      return
    }
    web3ProviderRef.current = new providers.Web3Provider(ethereum)
    const [currentAccount] = await web3ProviderRef.current.send("eth_requestAccounts", [])
    console.log(currentAccount)
    setConnected(true)                                                    
  }

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

  const buyMeACoffee = async () => {
    try{
      const signer = web3ProviderRef.current.getSigner()
      const buyMeACoffeeContract = new Contract(address,abi,signer)
      const {name, message} = userInputs
      console.log('Buying a coffee')
      const Tx = await buyMeACoffeeContract.buyACoffee(
        name.trim() !== ''? name : 'Anon',
        message.trim() !== '' ? message: 'Enjoy Your Coffee',
        {value: utils.parseEther('0.001')}
      )
      await Tx.wait()
      console.log(`Mined at ${Tx.hash}`)
      console.log(`Coffee purchased!`)
    } catch {
      console.error('Something went wrong while purchasing the coffee')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await buyMeACoffee()
    setUserInputs(INITIAL_INPUTS_STATE)
  }

  useEffect(()=> {
    if(!web3ProviderRef.current){
      connectWallet()
    }
  }, [])

  const content = isConnected ?
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputContainer}>  
        <label htmlFor="name">Name</label>
        <input onChange={handleNameChange} value={userInputs.name} id="name" type='text' placeholder='Enter your name...' />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="message">Message</label>
        <textarea onChange={handleMessageChange} value={userInputs.message} id="message" placeholder='Enjoy your coffee'></textarea>
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