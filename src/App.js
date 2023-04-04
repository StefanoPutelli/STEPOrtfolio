import HandlerWrapper from "./comp/handlerWrapper";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RayCaster from "./comp/Raycaster";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HandlerWrapper X={"6000"} Y={"6000"} />} />
          <Route path="webraycasting" element={<RayCaster />} />
        </Route>
      </Routes>
    </BrowserRouter>
    
  )
}


