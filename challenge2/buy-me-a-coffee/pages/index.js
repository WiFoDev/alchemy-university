import { Layout } from '../components/Layouts'
import { TipForm } from '../components/TipForm'
import { useState,useEffect, useRef} from 'react'
import { providers, Contract, utils } from 'ethers'
import contractData from '../utils/BuyMeACoffee.json'
import styles from '../styles/Home.module.css'
import { MemoList } from '../components/MemoList'


const {address, abi} = contractData

export default function Home() {
  const [isConnected, setConnected] = useState(false);
  const [memos, setMemos] = useState([])
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

  const getMemos = async () => {
    try{
      const buyMeACoffeeContract = new Contract(address,abi,web3ProviderRef.current)
      console.log('Fetching memos...')
      const memosFromContract = await buyMeACoffeeContract.getMemos();
      console.log('Memos Fetched')
      const newMemos = memosFromContract.map(memo => {
        const [from, timestamp, name, message] = memo
        const newTime = new Date(timestamp * 1000)
        const newMemo = {
          from,
          timestamp: newTime,
          name,
          message
        }
        return newMemo
      })
      setMemos(newMemos)
    } catch {
      console.error('Could not fetch memos')
    }
  }

  useEffect(()=> {
    if(!web3ProviderRef.current){
      connectWallet()
      getMemos()
    }
  }, [])

  return (
    <Layout >
      {isConnected &&
        <>
          <TipForm 
            buyMeACoffee={buyMeACoffee}
          />
          <MemoList memos={memos} />
        </>
      }
      {
        !isConnected && <button onClick={()=>connectWallet()} className={styles.button}>Connect Wallet</button>
      }
      
    </Layout>
  )
}
