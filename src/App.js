import { useState, useEffect } from "react";
import World from "./comp/World";

export default function App() {
  const [screenResize, setScreenResize] = useState(window.innerHeight / window.innerWidth);

  function resize() {
    setScreenResize(window.innerHeight / window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <World screenResize={screenResize} X={"3000"} Y={"3000"} />
  )
}


