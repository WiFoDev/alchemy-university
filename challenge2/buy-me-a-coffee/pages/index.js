import { Layout } from '../components/Layouts'
import { TipForm } from '../components/TipForm'
import { useState,useEffect, useRef} from 'react'
import { providers, Contract, utils } from 'ethers'
import contractData from '../utils/BuyMeACoffee.json'
import styles from '../styles/Home.module.css'


const {address, abi} = contractData

export default function Home() {
  const [isConnected, setConnected] = useState(false);
  const web3ProviderRef = useRef(null)

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
  
  const buyMeACoffee = async (userInputs) => {
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

  useEffect(()=> {
    if(!web3ProviderRef.current){
      connectWallet()
    }
  }, [])

  return (
    <Layout >
      {isConnected &&
        <TipForm 
          buyMeACoffee={buyMeACoffee}
        />
      }
      {
        !isConnected && <button onClick={()=>connectWallet()} className={styles.button}>Connect Wallet</button>
      }
      
    </Layout>
  )
}
