import HandlerWrapper from "./comp/handlerWrapper";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RayCaster from "./comp/Raycaster";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import favicon from './favicon.ico';

export default function App() {

  return (
    <HelmetProvider>
      <Helmet>
        <title>Stefano Putelli - Full Stack Dev</title>
        <link rel="icon" href={favicon} />
      </Helmet>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<HandlerWrapper X={"6000"} Y={"6000"} />} />
            <Route path="webraycasting" element={<RayCaster />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}


