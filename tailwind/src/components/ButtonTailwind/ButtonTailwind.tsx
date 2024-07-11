import { HTMLAttributes, PropsWithChildren } from "react"

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement>, PropsWithChildren {
  icon?: string
}

const ButtonTailwind = ({ children, icon, ...props }: ButtonProps) => {
  return (
    <button {...props} className={`p-4 mx-auto bg-white rounded-xl shadow-lg flex items-center gap-4 ${props.className || ''}`}>
      <div className="shrink-0 text-5xl">
        {icon || '👍'}
      </div>
      <div className="text-xl font-medium text-black">
        {children}
      </div>
    </button>
  )
}

export default ButtonTailwind

