import React from 'react'
interface GradientButtonProps{
     onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
    children:React.ReactNode,
    disabled?:boolean
}
 function GradientButton({onClick,disabled,children}:GradientButtonProps) {
  return (
     <button
                onClick={onClick}
                disabled={disabled}
                className="
                  flex gap-2
                  px-4 py-2 rounded
                  text-white
                  bg-gradient-to-r from-[#ff5200] to-[#B20E38]
                  relative
                  overflow-hidden
                  before:absolute before:-inset-1 before:blur-lg before:bg-gradient-to-r before:from-[#C65930] before:to-[#B20E38] before:opacity-36 before:rounded
                  hover:before:bg-gradient-to-l   hover:before:opacity-28
                  transition-opacity duration-300
                  z-10
                  my-2
                "
              >
                {children}
              </button>
  )
}

export default GradientButton