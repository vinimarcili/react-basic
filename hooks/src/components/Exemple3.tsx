import { useEffect, useState } from "react"

const Exemple3Component = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div>
      <h4>
        Window size
      </h4>
      <p>
        Width: {windowSize.width}<br />
        Height: {windowSize.height}
      </p>
    </div>
  )
}

export default Exemple3Component

