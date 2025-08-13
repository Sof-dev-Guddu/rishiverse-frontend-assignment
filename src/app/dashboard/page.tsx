import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

function page() {
  return (
    <div className='p-4 mr-4'>
      <SidebarTrigger className='md:hidden'/>
      
     <div className='w-full h-full flex flex-col items-center justify-center'>
       <h1 className='text-4xl md:text-6xl '>Main Dashboard</h1>
       <p>
        This is Dummy Page click Students on sidebar to see students Informations
       </p>
     </div>
      
      </div>
  )
}

export default page