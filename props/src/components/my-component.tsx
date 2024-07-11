import { PropsWithChildren } from 'react'

interface MyComponentProps extends PropsWithChildren {
  color?: string
  identifyClick?: (button: HTMLButtonElement) => void
}

const MyComponent = ({ color = 'blue', identifyClick, children }: MyComponentProps) => {
  return (
    <>
      <p
        style={{
          color: color
        }}
      >
        {children}
      </p>
      <button onClick={(e) => identifyClick ? identifyClick(e.currentTarget) : null}>
        Click
      </button>
    </>
  )
}

export default MyComponent


