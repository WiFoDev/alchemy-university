import { useState } from 'react'
import { CollectionForm } from '../components/CollectionForm'
import { Layout } from '../components/Layout'
import { NFTList } from '../components/NFTList'

const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${apiKey}`

export default function Home () {
  const [NFTs, setNFTs] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [nextPage, setNextPage] = useState(null)
  const [walletOwner, setWalletOwner] = useState(null)

  const fetchNFTs = async (owner, collection) => {
    setWalletOwner(owner)
    let endpoint = `${baseURL}/getNFTs?owner=${owner}`
    if (collection.length) {
      endpoint = `${endpoint}&contractAddresses%5B%5D=${collection}`
    }
    setIsLoading(true)
    const { ownedNfts, pageKey } = await fetch(endpoint).then(res => res.json())
    setIsLoading(false)
    setNextPage(pageKey)
    setNFTs(ownedNfts)
  }

  const fetchNFTsForCollection = async (collection) => {
    const endpoint = `${baseURL}/getNFTsForCollection?contractAddress=${collection}&withMetadata=true`
    setIsLoading(true)
    const { nfts } = await fetch(endpoint).then(res => res.json())
    setIsLoading(false)
    setNFTs(nfts)
  }

  const handleChangePage = async () => {
    const endpoint = `${baseURL}/getNFTs?owner=${walletOwner}&pageKey=${nextPage}`
    setIsLoading(true)
    const { ownedNfts, pageKey } = await fetch(endpoint).then(res => res.json())
    setIsLoading(false)
    setNextPage(pageKey)
    setNFTs(ownedNfts)
  }

  return (
    <Layout >
      <CollectionForm
        fetchNFTs={fetchNFTs}
        fetchNFTsForCollection={fetchNFTsForCollection}
      />
      <NFTList
        nfts={NFTs}
        nextPage={nextPage}
        changePage={handleChangePage}
        isLoading={isLoading}
      />
    </Layout>
  )
}
