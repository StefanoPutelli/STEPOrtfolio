import { useState } from "react";
import Typewriter from "./comp/typewriter";
import gitHub from "./img/github.svg";
import cv from "./img/cv.png";
import Bg from "./comp/animBg";


function App() {

  const [screenResize, setScreenResize] = useState(window.innerHeight / window.innerWidth);

  return (
    <div className="App">
      <Bg screenResize={screenResize} setScreenResize={setScreenResize}/>
      <div className="absolute top-[10vh] w-screen">
        <div className="m-auto w-screen text-center">
          <div className="h-[20vh] mb-[10vh]">
            <Typewriter textSize={screenResize >= 1 ? "3vh" : "5vh"} minDelay={10} maxDelay={20} text1="Hi, my name is Stefano." text2="I am a Full-stack Developer" />
          </div>
        </div>
        <div className="absolute top-[20vh] w-screen">
          <img className="m-auto w-[20vh] cursor-pointer" src={gitHub} alt="My github" onClick={() => {
            window.open("https://github.com/StefanoPutelli/", "_blank");
          }} />
          <div style={{ display: 'inline-block', color: "white", marginTop: "20px", width: "100%", fontFamily: "Source code pro", fontSize: 15, textAlign: "center" }} dangerouslySetInnerHTML={{ __html: "Check out my github to<br>follow my projects" }} />
          <div className="m-auto w-fit">
            <img className="inline w-[12vh] mt-5 cursor-pointer" src={cv} alt="CV" onClick={() => {
              window.open("https://drive.google.com/file/d/1Knr0Q_yJuN6LXZ6u8p_Xy7lwKWCppt-X/view?usp=sharing", "_blank");
            }} />
            <div style={{ display: 'inline-block', color: "white", marginTop: "0%", fontFamily: "Source code pro", fontSize: 15, textAlign: "center", alignItems: "center" }} dangerouslySetInnerHTML={{ __html: "Here is my CV" }} />
          </div>
          <div style={{ color: "white", marginTop: "40px", width: "100%", fontFamily: "Source code pro", fontSize: 15, textAlign: "center" }} dangerouslySetInnerHTML={{ __html: "Try to click on the background,<br>something cool will happen..." }} />
        </div>
      </div>
    </div>
  );
}

export default App;
