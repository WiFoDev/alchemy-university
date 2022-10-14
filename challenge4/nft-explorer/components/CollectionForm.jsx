import React from 'react'

export const CollectionForm = () => {
  return (
    <section className="min-h-[33.33%] grid place-items-center">
      <form className='w-1/2 flex flex-col gap-2 items-center'>
        <input
        className='bg-[#f1f5f9] w-full p-1 rounded outline-[#92c5fd]'
        type="text"
        placeholder='Add your wallet address'
        />
        <input
        className='bg-[#f1f5f9] w-full p-1 rounded outline-[#92c5fd]'
        type="text"
        placeholder='Add the collection address'
        />
        <div className='flex items-center justify-center gap-1'>
          <input type="checkbox" id='fetchCollection'/>
          <label htmlFor="fetchCollection">Fetch for collection</label>
        </div>
        <button className='w-1/2 bg-[#60a5fa] py-2 rounded text-white font-medium'>Let&apos;s go!</button>
      </form>
    </section>
  )
}
