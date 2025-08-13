import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <header className='flex justify-between items-center h-10 md:h-12 sticky top-0 left-0 border-b border-gray-100 shadow z-20 p-4 md:px-12'>
     <h1 className='text-secondary italic font-bold text-xl md:text-3xl curser-pointer '><Link href={"/"}>Rishiverse</Link></h1>
     <h2>Toggle</h2>
    </header>
  )
}

export default Header