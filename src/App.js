import { useState, useEffect } from "react";
import HandlerWrapper from "./comp/handlerWrapper";

export default function App() {
  // const [screenResize, setScreenResize] = useState(window.innerHeight / window.innerWidth);

  // function resize() {
  //   setScreenResize(window.innerHeight / window.innerWidth)
  // }

  // useEffect(() => {
  //   window.addEventListener('resize', resize)
  //   return () => {
  //     window.removeEventListener('resize', resize)
  //   }
  // }, [])

  return (
    <HandlerWrapper X={"3000"} Y={"3000"} />
  )
}


