import { useState } from 'react'
import { CollectionForm } from '../components/CollectionForm'
import { Layout } from '../components/Layout'
import { NFTList } from '../components/NFTList'

const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${apiKey}`

export default function Home () {
  const [NFTs, setNFTs] = useState([])

  const fetchNFTs = async (owner, collection) => {
    let endpoint = `${baseURL}/getNFTs?owner=${owner}`
    if (collection.length) {
      endpoint = `${endpoint}&contractAddresses%5B%5D=${collection}`
    }
    const { ownedNfts } = await fetch(endpoint).then(res => res.json())
    setNFTs(ownedNfts)
  }

  const fetchNFTsForCollection = async (collection) => {
    const endpoint = `${baseURL}/getNFTsForCollection?contractAddress=${collection}&withMetadata=true`
    const { nfts } = await fetch(endpoint).then(res => res.json())
    setNFTs(nfts)
  }
  console.log(NFTs)
  return (
    <Layout >
      <CollectionForm
        fetchNFTs={fetchNFTs}
        fetchNFTsForCollection={fetchNFTsForCollection}
      />
      <NFTList nfts={NFTs}/>
    </Layout>
  )
}
