import { useEffect, useState } from "react"

const GetWindowSizeComponent = () => {
  // const [width, setWidth] = useState(window.innerWidth)
  // const [height, setHeight] = useState(window.innerHeight)
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    const handleResize = () => {
      // setWidth(window.innerWidth)
      // setHeight(window.innerHeight)
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    console.log('oi')
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    if (windowSize.width === windowSize.height) {
      console.log("Window is square")
    }
  }, [windowSize.width, windowSize.height])

  return (
    <div>
      <h4>
        Window Size
      </h4>
      <p>
        Width: {windowSize.width}px <br/>
        Height: {windowSize.height}px
      </p>
    </div>
  )
}

export default GetWindowSizeComponent