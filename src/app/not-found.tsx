import Link from 'next/link'
import React from 'react'

function PageNotFound() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
       <h1> 404-PageNotFound</h1>
    <Link href={"/"} className='border-b border-sky-700 text-sky-700 hover:text-sky-500 hover:border-sky-500 curser-pointer'>Go Back To Home</Link>  

    </div>
  )
}

export default PageNotFound