import React, { useState } from 'react'

export const CollectionForm = () => {
  const [walletAddress, setWalletAddress] = useState('')
  const [collectionAddress, setCollectionAddress] = useState('')
  const [isCollectionInputDisable, setCollectionInputDisable] = useState(true)

  const fetchNFTs = (e) => {
    e.preventDefault()
    console.log({
      walletAddress,
      collectionAddress
    })
  }

  return (
    <section className="min-h-[33.33%] grid place-items-center">
      <form onSubmit={fetchNFTs} className='w-1/2 flex flex-col gap-2 items-center'>
        <input
        className='bg-[#f1f5f9] w-full p-1 rounded outline-[#92c5fd]'
        type="text"
        placeholder='Add your wallet address'
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
        />
        <input
        className={`bg-[#f1f5f9] w-full p-1 rounded outline-[#92c5fd] ${isCollectionInputDisable ? 'cursor-not-allowed' : ''}`}
        type="text"
        placeholder='Add the collection address'
        value={collectionAddress}
        onChange={(e) => setCollectionAddress(e.target.value)}
        disabled={isCollectionInputDisable}
        />
        <div className='flex items-center justify-center gap-1'>
          <input
            type="checkbox"
            id='fetchCollection'
            checked={!isCollectionInputDisable}
            onChange={() => setCollectionInputDisable(prev => !prev) }
          />
          <label htmlFor="fetchCollection">Fetch for collection</label>
        </div>
        <button className='w-1/2 bg-[#60a5fa] py-2 rounded text-white font-medium'>Let&apos;s go!</button>
      </form>
    </section>
  )
}
